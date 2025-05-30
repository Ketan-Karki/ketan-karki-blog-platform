import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  // Configure CORS properly for your frontend
  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Add your frontend URL(s)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.setGlobalPrefix("api");

  // Use port 3001 as you mentioned
  await app.listen(3001);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log("API endpoints available at /api/*");
}
bootstrap();
