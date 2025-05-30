import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeedService } from "./seed.service";
import { Category } from "../../categories/category.entity";
import { Post } from "../../posts/post.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Post])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
