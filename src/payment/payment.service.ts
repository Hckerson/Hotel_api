import axios from "axios";
import "dotenv/config";
import { Injectable } from "@nestjs/common";
import { PaymentDto } from "src/payment/dto/payment.dto";

@Injectable()
export class Paystack {
  //contains configuration to make a request to the paystack API
  private options = {
    headers: {},
  };
  constructor() {
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
        return { message: "success", status: 200 };
      } else {
        return { message: "failed", status: 400 };
      }
    } catch (error) {
      console.error(
        `Error verifying transaction with reference ${referenceId}: ${error}`
      );
    }
  }

  async fetchAllTransaction(customerId: string) {
    /**
     * Retrieve all transaction carried out by a customer
     * @param customerId - the id of the customer
     * @returns -List of all transaction found
     */

    try {
      if (!customerId) {
        const response = await axios.get(
          "https://api.paystack.co/transaction",
          this.options
        );
        return response.data.data;
      }
      const response = await axios.get(
        "https://api.paystack.co/transaction",
        this.options
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching all transactions`);
    }
  }
}
