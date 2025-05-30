import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import { Category } from "../categories/category.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) {}

  async findAll(categorySlug?: string): Promise<Post[]> {
    if (categorySlug) {
      const category = await this.categoriesRepository.findOne({
        where: { slug: categorySlug },
      });

      if (category) {
        return this.postsRepository.find({
          where: { category: { id: category.id }, published: true },
          order: { publishedAt: "DESC" },
          relations: ["category"],
        });
      }
    }

    return this.postsRepository.find({
      where: { published: true },
      order: { publishedAt: "DESC" },
      relations: ["category"],
    });
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { slug, published: true },
      relations: ["category"],
    });

    if (!post) {
      throw new NotFoundException(`Post with slug "${slug}" not found`);
    }

    return post;
  }

  async findOne(slug: string): Promise<Post> {
    return this.postsRepository.findOne({
      where: { slug, published: true },
      relations: ["category"],
    });
  }
}
