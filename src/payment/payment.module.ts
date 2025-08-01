import { Query } from './db/query';
import { Module } from '@nestjs/common';
import { Paystack } from './payment.service';

import { PaymentController } from './payment.controller';

@Module({
  controllers: [PaymentController],
  providers: [ Paystack, Query],
})
export class PaymentModule {}
