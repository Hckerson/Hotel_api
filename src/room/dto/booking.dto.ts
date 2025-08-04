import { BookingStatus } from "generated/prisma";
import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsUrl,
  IsDate,
  IsArray,
  IsObject,
  IsNumber,
  IsEnum,
} from "class-validator";
export class BookingDto{
  @IsString()
  guestId: string;

  @IsString()
  roomId: string;

  @IsInt()
  price: number;

  @IsDate()
  checkInDate: Date;

  @IsDate()
  checkOutDate: Date;

  @IsEnum(BookingStatus)
  status: BookingStatus
}