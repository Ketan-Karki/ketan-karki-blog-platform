import { Controller, Get, Param } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    const data = await this.categoriesService.findAll();
    return { data };
  }

  @Get(":slug")
  async findOne(@Param("slug") slug: string) {
    const data = await this.categoriesService.findBySlug(slug);
    return { data };
  }
}
