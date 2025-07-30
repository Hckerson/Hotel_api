import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Paystack } from './services/paystack/paystack';
import { PaymentController } from './payment.controller';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, Paystack],
})
export class PaymentModule {}
