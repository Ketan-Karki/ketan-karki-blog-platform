import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./post.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<Post[]> {
    const skip = (page - 1) * limit;
    return this.postsRepository.find({
      where: { published: true },
      order: { publishedAt: "DESC" },
      relations: ["category"],
      skip,
      take: limit,
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
}
