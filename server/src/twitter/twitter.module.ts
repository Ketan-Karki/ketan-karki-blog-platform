import { Module } from '@nestjs/common';
import { TwitterController } from './twitter.controller';
import { TwitterService } from './twitter.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { TweetRepository } from './repositories/tweet.repository';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Tweet]),
    ScheduleModule.forRoot(),
  ],
  controllers: [TwitterController],
  providers: [TwitterService, TweetRepository],
  exports: [TwitterService],
})
export class TwitterModule {}
