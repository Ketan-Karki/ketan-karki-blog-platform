import { NestFactory } from "@nestjs/core";
import { AppModule } from "../../app.module";
import { SeedService } from "./seed.service";

async function bootstrap() {
  try {
    console.log("🌱 Starting database seeding...");

    const app = await NestFactory.createApplicationContext(AppModule);
    const seedService = app.get(SeedService);

    await seedService.seedAll();
    console.log("✅ Seeding completed successfully");

    await app.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

bootstrap();
