import { Controller, Get, Param, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Post } from "./post.entity";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query("category") categorySlug?: string): Promise<Post[]> {
    return this.postsService.findAll(categorySlug);
  }

  @Get(":slug")
  async findOne(@Param("slug") slug: string): Promise<Post> {
    return this.postsService.findOne(slug);
  }
}
