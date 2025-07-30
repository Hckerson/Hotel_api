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
import { PaymentService } from "./payment.service";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("initialize")
  async initialize(@Body() data: PaymentDto) {
    return await this.paymentService.initializePayment(data)
  }
}
