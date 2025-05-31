import { Controller, Get, Param, Post } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { Tweet } from './entities/tweet.entity';

interface ThreadResponse {
  success: boolean;
  tweets: Tweet[];
}

interface FetchResponse {
  success: boolean;
  message: string;
}

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Get('tweets')
  async getAllTweets(): Promise<ThreadResponse> {
    return this.twitterService.getAllTweets();
  }

  @Post('fetch-tweets')
  async fetchTweets(): Promise<FetchResponse> {
    return this.twitterService.fetchAndStoreLatestTweets();
  }
}
