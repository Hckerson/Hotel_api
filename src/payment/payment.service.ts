import "dotenv/config";
import axios from "axios";
import { Request } from "express";
import { Query } from "./db/query";
import { createHmac } from "node:crypto";
import { QueryDto } from "./dto/query.dto";
import { Injectable } from "@nestjs/common";
import { PaymentDto } from "src/payment/dto/payment.dto";

@Injectable()
export class Paystack {
  //contains configuration to make a request to the paystack API
  private options = {
    headers: {},
  };
  // base url of the paystack API
  private readonly baseUrl: string = "https://api.paystack.co";
  // paystack secret
  private readonly secret: string = process.env.PAYSTACK_SECRET_KEY || "";
  constructor(private readonly query: Query) {
    this.options.headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    };
  }

  async initializePayment(data: PaymentDto) {
    /**
     * Makes request to the paystack API
     * @param data -Request body being set to the paystack api
     * @returns -Response from the paystack API
     */

    try {
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        data,
        this.options
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      }
      console.error(`Error making api request to paystack API: ${error}`);
    }
  }

  async verifyTransaction(referenceId: string) {
    /**
     * verify the status of a transaction using the reference
     * @param referenceId - the reference of the transaction
     * @returns the transaction detail
     */
    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${referenceId}`,
        this.options
      );
      const { status } = response.data.data;
      if (status == "success") {
        return { message: "success", status: 200, data: response.data.data };
      } else {
        return { message: "failed", status: 400, data: null };
      }
    } catch (error) {
      console.error(
        `Error verifying transaction with reference ${referenceId}: ${error}`
      );
    }
  }

  async fetchAllTransaction(query: QueryDto) {
    /**
     * Retrieve all transaction carried out by a customer
     * @param customerId - the id of the customer
     * @returns -List of all transaction found
     */
    const endpoint = "https://api.paystack.co/transaction";
    const url = new URL(endpoint);
    const param = new URLSearchParams(url.search);
    if (query.amount) {
      param.append("amount", query.amount.toString());
    }
    if (query.customer) {
      param.append("customer", query.customer.toString());
    }
    if (query.perPage) {
      param.append("perPage", query.perPage.toString());
    }
    if (query.page) {
      param.append("page", query.page.toString());
    }
    if (query.status) {
      param.append("status", query.status);
    }
    try {
      const response = await axios.get(
        `${endpoint}?${param.toString()}`,
        this.options
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching all transactions`);
    }
  }

  async fetchTransactionById(id: number) {
    /**
     * Fetch transactional details about a payment
     * @param id -ID of the payment
     * @returns -Details of the payment
     */
    try {
      const result = await axios.get(
        `${this.baseUrl}/transaction/${id}`,
        this.options
      );
      return result.data.data;
    } catch (error) {
      console.error(`Error fetching transaction with id ${id}: ${error}`);
    }
  }

  async handleWebhook(data: unknown, request: Request) {
    /**
     * Verifies origin and handles webhooks from the paystack API
     * @param data -The request body
     * @param request -The request object to extract headers
     */

    try {
      const hash = createHmac("sha512", this.secret)
        .update(JSON.stringify(data))
        .digest("hex");
      if (hash == request.headers["x-paystack-signature"]) {
        // Retrieve the request's body
        const event = request.body;
        // Do something with event
        if (event.event == "charge.success") {
          const { metadata } = event.data;
          const { bookingId, userId } = metadata;
          bookingId.map(async (id: string) => {
            await this.query.updateBookingStatus(id, userId, event.data);
          });
        }
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      }
      console.error(error.message);
      console.error(`Error fetching webhook details: ${error}`);
    }
  }
}
