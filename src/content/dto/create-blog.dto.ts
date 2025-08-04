import { IsString, IsBoolean } from "class-validator";
export class CreateBlog {
  @IsString()
  adminId:string;

  @IsString()
  title:string;

  @IsString()
  slug:string;

  @IsString()
  content:string;

  @IsBoolean()
  published:boolean
}
