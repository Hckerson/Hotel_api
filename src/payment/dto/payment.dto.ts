import {
  IsString,
  IsInt,
  IsOptional,
  IsUrl,
  IsArray,
  IsObject,
  IsNumber,
} from "class-validator";
export class PaymentDto {
  @IsString()
  email: string;

  @IsInt()
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  plan?: string;

  @IsOptional()
  @IsNumber()
  invoice_lint?: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  channels?: string[];

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  callback_url?: string;
}
