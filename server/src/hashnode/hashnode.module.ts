import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HashnodeService } from "./hashnode.service";
import { HashnodeController } from "./hashnode.controller";
import { Post } from "../posts/post.entity";
import { Category } from "../categories/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category])],
  controllers: [HashnodeController],
  providers: [HashnodeService],
  exports: [HashnodeService],
})
export class HashnodeModule {}
