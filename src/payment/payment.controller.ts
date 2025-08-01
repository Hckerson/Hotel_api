import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentDto } from "./dto/payment.dto";
import { Paystack } from "./payment.service";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paystack: Paystack) {}

  @Post("initialize")
  async initialize(@Body() data: PaymentDto) {
    return await this.paystack.initializePayment(data)
  }

  @Post("verifyTransaction/:reference")
  async verify(@Param('reference') reference: string){
    return await this.paystack.verifyTransaction(reference)
  }

  @Get('getAllTransaction/:customerId')
  async fetchAllTransaction(@Param('customerId') customerId: string){
    return await this.paystack.fetchAllTransaction(customerId)
  }
}
