import { PartialType } from "@nestjs/mapped-types";
import { CreateTestimonial } from "./create-testimonial.dto";

export class UpdateTestimonial extends PartialType(CreateTestimonial){
  
}