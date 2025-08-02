import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class Query {
  constructor(private readonly prisma: PrismaService) {}
  async updateBookingStatus(
    bookingId: string,
    userId: string,
    transaction: Record<string, any>
  ) {
    const {
      reference,
      status,
      paid_at,
      channel,
      currency,
      metadata,
      amount,
      ...customer
    } = transaction;
    
    const action = status == "success" ? "SUCCESS" : "PENDING";
    try {
      await this.prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status: "CONFIRMED",
          payment: {
            update: {
              amount,
              currency,
              status: action,
              channel,
              guestId: userId,
            },
          },
        },
      });
    } catch (error) {
      console.error(`Error updaring  booking status`);
    }
  }
}
