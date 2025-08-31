import {
  IsString,
  IsInt,
  IsArray,
} from "class-validator";
export class RoomDto {
  @IsString()
  checkInDate: string;

  @IsString()
  checkOutDate: string;

  @IsInt()
  priceMin: number;

  @IsString()
  name: string;

  @IsString()
  capacity: string;

  @IsArray()
  @IsString({each: true})
  amenities: string[];

  @IsInt()
  priceMax: number;
}
