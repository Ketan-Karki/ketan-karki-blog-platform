import {
  Controller,
  Post,
  Body,
  Logger,
  BadRequestException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HashnodeService } from "./hashnode.service";

@Controller("hashnode")
export class HashnodeController {
  private readonly logger = new Logger(HashnodeController.name);

  constructor(private readonly hashnodeService: HashnodeService) {}

  @Post("import")
  async importPost(@Body() body: { url: string }) {
    if (!body.url) {
      throw new BadRequestException("URL is required");
    }

    try {
      // Validate URL format
      new URL(body.url);
    } catch (error) {
      throw new BadRequestException("Invalid URL format");
    }

    this.logger.log(`Importing post from: ${body.url}`);

    try {
      return await this.hashnodeService.importHashnodePost(body.url);
    } catch (error) {
      this.logger.error(`Error importing post: ${error.message}`);
      throw new HttpException(
        `Failed to import post: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
