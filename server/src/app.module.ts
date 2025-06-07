import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PostsModule } from "./posts/posts.module";
import { CategoriesModule } from "./categories/categories.module";
import { SeedModule } from "./database/seeds/seed.module";
import { HashnodeModule } from "./hashnode/hashnode.module";
import { TwitterModule } from "./twitter/twitter.module";
import { TILModule } from "./til/til.module";
import { SubscribersModule } from "./subscribers/subscribers.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST", "localhost"),
        port: configService.get("DB_PORT", 5432),
        username: configService.get("DB_USERNAME", "postgres"),
        password: configService.get("DB_PASSWORD", "password"),
        database: configService.get("DB_NAME", "slowdowntime"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: configService.get("NODE_ENV") !== "production",
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    CategoriesModule,
    HashnodeModule,
    TwitterModule,
    TILModule,
    SubscribersModule,
    SeedModule,
  ],
})
export class AppModule {}
