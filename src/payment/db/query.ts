import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class Query{
  constructor(private readonly prisma: PrismaService){}

  async createTransaction(data: any){
    return this.prisma
  }

  async setTransactionStatus(verifyDto: Record<string, any>){
    const {status, reference, paid_at, channel, currency, amount, ...customer} = verifyDto
    const {email, phone} = customer
  }
}