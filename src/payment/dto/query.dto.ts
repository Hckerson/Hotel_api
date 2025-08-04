import {
  IsString,
  IsInt,
} from "class-validator";
export class QueryDto{
  @IsInt()
  perPage: number;

  @IsInt()
  page: number;

  @IsInt()
  customer: number;

  @IsInt()
  amount: number;

  @IsString()
  status: string;
}