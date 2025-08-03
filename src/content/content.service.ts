import { Injectable } from "@nestjs/common";
import { CreateBlog } from "./dto/create-blog.dto";
import { UPdateBlog } from "./dto/update-blog.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTestimonial } from "./dto/create-testimonial.dto";
import { UpdateTestimonial } from "./dto/update-testimonial.dto";
import { CreateAmenities } from "./dto/create-amenities.dto";

@Injectable()
export class ContentService {
  /**
   * Service to create delete and update blogs, testimonial and amenities
   */
  constructor(private readonly prisma: PrismaService) {}
  async createBlog(createBlog: CreateBlog) {
    /**
     * Create new blog
     * @param createBlog -Blog object to be created
     * @returns -Returns a success/failure message
     */
    try {
      const blog = await this.prisma.blogPost.create({
        data: createBlog,
      });
      if (!blog) return { message: "create failed" };
      return { message: "success" };
    } catch (error) {
      console.error(`Error creating new blog`);
    }
  }

  async findAllBlogs() {
    /**
     * Finds and return all existing blog
     */
    try {
      const allBlog = await this.prisma.blogPost.findMany();
      if (!allBlog) return { message: "fetch failed", data: null };
      return { message: "success", data: allBlog };
    } catch (error) {
      console.error(`Error finding all blogs`);
    }
  }

  async findOneBlog(id: string) {
    /**
     * Find a blog by it's id
     * @param id -ID of the blog
     * @returns -Response object containing success/failure message and blog object
     */
    try {
      const blog = await this.prisma.blogPost.findUnique({
        where: {
          id,
        },
      });
      if (!blog) return { message: "fetch failed", data: null };
      return { message: "success", data: blog };
    } catch (error) {
      console.error(`Error fetching blog with id ${id}`);
    }
  }

  async updateBlog(id: string, updateBlog: UPdateBlog) {
    /**
     * Update blog with the provided data
     * @param id -ID of the blog to be updated
     * @returns -Updated version of the blog
     */
    try {
      const updatedBlog = await this.prisma.blogPost.update({
        where: {
          id,
        },
        data: {
          ...updateBlog,
        },
      });
      if (!updatedBlog) return { message: "fetch failed", data: null };
      return { message: "success", data: updatedBlog };
    } catch (error) {
      console.error(`Failed to update blog with id ${id}: ${error}`);
    }
  }

  async removeBlog(id: string) {
    /**
     * Remove blog with the provided id
     * @param id -ID of the blog to be removed
     * @returns -Success/failure message
     */

    try {
      const deletedBlog = await this.prisma.blogPost.delete({
        where: {
          id,
        },
      });
      if (!deletedBlog) return { message: "delete failed", data: null };
      return { message: "success", data: deletedBlog };
    } catch (error) {
      console.error(`Failed to remove blog with id ${id}: ${error}`);
    }
  }
  async createTestimonial(createTestimonial: CreateTestimonial) {
    /**
     * Create a new Testimonial
     * @param createTestimonial -Testimonial object to be created
     * @returns -Success/failure message
     */

    try {
      const testimonial = await this.prisma.testimonial.create({
        data: createTestimonial,
      });
      if (!testimonial) return { message: "create failed" };
      return { message: "success" };
    } catch (error) {
      console.error(`Error creating new testimonial :${error}`);
    }
  }

  async findAllTestimonials() {
    /**
     * Find and return all testimonials
     * @return -Object containing all testimonail
     */
    try {
      const allTestimonials = await this.prisma.testimonial.findMany();
      if (!allTestimonials) return { message: "fetch failed", data: null };
      return { message: "success", data: allTestimonials };
    } catch (error) {
      console.error(`Error fetching all testimonials :${error}`);
    }
  }

  async findOneTestimonial(id: string) {
    /**
     * Find a specifc testimonail
     * @param -ID of the requested testimonial
     * @returns -Object containing success/failure message and testimonial
     */
    try {
      const testimonial = await this.prisma.testimonial.findUnique({
        where: { id },
      });
      if (!testimonial) return { message: "fetch failed", data: null };
      return { message: "success", data: testimonial };
    } catch (error) {
      console.error(`Error fetching testimonial by id: ${error}`);
    }
  }

  async updateTestimonial(id: string, updateTestimonial: UpdateTestimonial) {
    /**
     * Update a testimonial
     * @param id -ID of the testimonial to be updated
     * @param updateTestimonial -Testimonial object to be updated
     * @return -Updated version of the testimonial
     */

    try {
      const updatedTestimonial = await this.prisma.testimonial.update({
        where: {
          id,
        },
        data: {
          ...updateTestimonial,
        },
      });
      if (!updatedTestimonial) return { message: "update failed", data: null };
      return { message: "success", data: updatedTestimonial };
    } catch (error) {
      console.error(`Failed to update testimonial with id ${id}: ${error}`);
    }
  }

  async removeTestimonial(id: string) {
    /**
     * Delete a testimonial
     * @param id -ID of the testimonial to be deleted
     * @return -Object containing success/failure message
     */
    try {
      const deletedTestimonial = await this.prisma.testimonial.delete({
        where: { id },
      });
      if (!deletedTestimonial) return { message: "delete failed" };
      return { message: "success" };
    } catch (error) {
      console.error(`Error deleting testimonial: ${error}`);
    }
  }
  async createAmenity(createAmenities: CreateAmenities) {
    /**
     * Create new amenity
     * @param createAmenities -Object containing amenity details
     * @return -Object containing success/failure message
     */
    try {
      const amenity = await this.prisma.amenities.create({
        data: createAmenities,
      });
      if (!amenity) return { message: "create failed" };
      return { message: "success" };
    } catch (error) {
      console.error(`Error creating amenity: ${error}`);
    }
  }

  async findAllAmenities() {
    /**
     * Find all amenities
     * @return -Object containing all amenities
     */
    try {
      const amenities = await this.prisma.amenities.findMany();
      if (!amenities) return { message: "fetch failed", data: null };
      return { message: "success", data: amenities };
    } catch (error) {
      console.error(`Error fetching all amenities: ${error}`);
    }
  }

  async findOneAmenity(id: string) {
    /**
     * Find a specific amenity
     * @param id -ID of the amenity
     * @return -Object containing success/failure message and amenity
     */
    try {
      const amenity = await this.prisma.amenities.findUnique({
        where: { id },
      });
      if (!amenity) return { message: "fetch failed", data: null };
      return { message: "success", data: amenity };
    } catch (error) {
      console.error(`Error find amenity by id: ${error}`);
    }
  }

  async updateAmenity(id: string, updateContentDto) {
    /**
     * Update an amenity
     * @param id -ID of the amenity to be updated
     * @param updateContentDto -Object containing amenity details
     * @return -Updated version of the amenity
     */
    try {
      const updatedAmenity = await this.prisma.amenities.update({
        where: {
          id,
        },
        data: {
          ...updateContentDto,
        },
      });
      if (!updatedAmenity) return { message: "update failed", data: null };
      return { message: "success", data: updatedAmenity };
    } catch (error) {
      console.error(`Failed to update amenity with id ${id}: ${error}`);
    }
  }

  async removeAmenity(id: string) {
    /**
     * Delete an amenity
     * @param id -ID of the amenity to be deleted
     * @return -Object containing success/failure message
     */
    try {
      const deletedAmenity = await this.prisma.amenities.delete({
        where: { id },
      });
      if (!deletedAmenity) return { message: "delete failed" };
      return { message: "success" };
    } catch (error) {
      console.error(`Error deleting amenity: ${error}`);
    }
  }
}
