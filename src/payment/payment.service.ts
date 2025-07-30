import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payment.dto';
import { Paystack } from './services/paystack/paystack';


@Injectable()
export class PaymentService {
  constructor(private readonly paystack: Paystack) {}
  /**
   * Handles logic for the payment route/service 
   * @param data -Request body being set to the paystack api
   */
  async initializePayment(data: PaymentDto) {
    return await this.paystack.initialize(data)
  }
}
