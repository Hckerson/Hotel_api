import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
  Query,
} from "@nestjs/common";
import { Paystack } from "./payment.service";
import { QueryDto } from "./dto/query.dto";
import { PaymentDto } from "./dto/payment.dto";
import { Request } from "express";

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

  @Get("getAllTransaction")
  async fetchAllTransaction(@Query() query: QueryDto){
    return await this.paystack.fetchAllTransaction(query)
  }

  @Get("getTransactionById/:id")
  async getTransactionById(@Param('id') id : string){
    return await this.paystack.fetchTransactionById(+id)
  }

  @Post('webhook/paystack')
  @HttpCode(200)
  async handleWebhook(@Body() data: any, @Req() request: Request){
    return await this.paystack.handleWebhook(data, request)
  }
}
