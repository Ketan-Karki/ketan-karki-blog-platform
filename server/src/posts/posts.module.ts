import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { Post } from "./post.entity";
import { Category } from "../categories/category.entity";
import { HashnodeModule } from "../hashnode/hashnode.module";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category]), HashnodeModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
