import { BookingStatus } from "generated/prisma";
export class BookingDto{
  guestId: string;
  roomId: string;
  price: number;
  checkInDate: Date;
  checkOutDate: Date;
  status: BookingStatus
}