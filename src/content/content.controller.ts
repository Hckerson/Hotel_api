import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ContentService } from "./content.service";
import { CreateBlog } from "./dto/create-blog.dto";
import { UPdateBlog } from "./dto/update-blog.dto";
import { CreateAmenities } from "./dto/create-amenities.dto";
import { UpdateAmenities } from "./dto/update-amenities.dto";
import { CreateTestimonial } from "./dto/create-testimonial.dto";
import { UpdateTestimonial } from "./dto/update-testimonial.dto";

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post("blog")
  createBlog(@Body() createBlog: CreateBlog) {
    return this.contentService.createBlog(createBlog);
  }

  @Get("blog")
  findAllBlog() {
    return this.contentService.findAllBlogs();
  }

  @Get("blog/:id")
  findOneBlog(@Param("id") id: string) {
    return this.contentService.findOneBlog(id);
  }

  @Patch("blog/:id")
  updateBlog(@Param("id") id: string, @Body() UPdateBlog: UPdateBlog) {
    return this.contentService.updateBlog(id, UPdateBlog);
  }

  @Delete("blog/:id")
  removeBlog(@Param("id") id: string) {
    return this.contentService.removeBlog(id);
  }
  @Post("testimonial")
  createTestimonial(@Body() createTestimonial: CreateTestimonial) {
    return this.contentService.createTestimonial(createTestimonial);
  }

  @Get("testimonial")
  findAllTestimonials() {
    return this.contentService.findAllTestimonials();
  }

  @Get("testimonial/:id")
  findOneTestimonial(@Param("id") id: string) {
    return this.contentService.findOneTestimonial(id);
  }

  @Patch("testimonial/:id")
  updateTestimonial(@Param("id") id: string, @Body() updateTestimonial: UpdateTestimonial) {
    return this.contentService.updateTestimonial(id, updateTestimonial);
  }

  @Delete("testimonial/:id")
  removeTestimonial(@Param("id") id: string) {
    return this.contentService.removeTestimonial(id);
  }
  @Post("amenities")
  createAmenity(@Body() createAMenity: CreateAmenities) {
    return this.contentService.createAmenity(createAMenity);
  }

  @Get("amenities")
  findAllAmenities() {
    return this.contentService.findAllAmenities();
  }

  @Get("amenities/:id")
  findOneAmenity(@Param("id") id: string) {
    return this.contentService.findOneAmenity(id);
  }

  @Patch("amenities/:id")
  updateAmenity(@Param("id") id: string, @Body() updateAmenity: UpdateAmenities) {
    return this.contentService.updateAmenity(id, updateAmenity);
  }

  @Delete("amenities/:id")
  removeAmenity(@Param("id") id: string) {
    return this.contentService.removeAmenity(id);
  }
}
