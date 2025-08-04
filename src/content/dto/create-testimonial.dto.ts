import { IsString, IsBoolean } from "class-validator";
export class CreateTestimonial{
  @IsString()
  adminId:string;

  @IsString()
  content:string;

  @IsString()
  approved:boolean
}