import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);

  // Configure CORS to allow requests from both development and production frontend
  app.enableCors({
    origin: [
      "http://localhost:3000", // Local development frontend
      "http://159.65.154.80:3000", // Production frontend
      /^https?:\/\/159\.65\.154\.80(:\d+)?$/, // Any port on your IP
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.setGlobalPrefix("api");

  // Start the server
  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log("API endpoints available at /api/*");
}
bootstrap();
