import { PartialType } from '@nestjs/swagger';
import { CreateBlog } from './create-blog.dto';

export class UPdateBlog extends PartialType(CreateBlog) {}
