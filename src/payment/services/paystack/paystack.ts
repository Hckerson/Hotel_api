import axios from "axios";
import "dotenv/config";
import { PaymentDto } from "src/payment/dto/payment.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Paystack {
  constructor() {}

  async initialize(data: PaymentDto) {
    /**
     * Makes request to the paystack API
     * @param data -Request body being set to the paystack api
     *
     */

    //contains configuration to make a request to the paystack API
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        data,
        options
      );
      return response.data;
    } catch (error) {
      console.error(`Error making api request to paystack API: ${error}`);
    }
  }
}
