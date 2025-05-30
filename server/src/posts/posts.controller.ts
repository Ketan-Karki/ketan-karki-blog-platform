import { Controller, Get, Param, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query("page") page = 1, @Query("limit") limit = 10) {
    const data = await this.postsService.findAll(page, limit);
    return { data };
  }

  @Get(":slug")
  async findOne(@Param("slug") slug: string) {
    const data = await this.postsService.findBySlug(slug);
    return { data };
  }
}
