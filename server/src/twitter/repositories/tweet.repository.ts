import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Tweet } from '../entities/tweet.entity';

@Injectable()
export class TweetRepository {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}

  async findAll(): Promise<Tweet[]> {
    return this.tweetRepository.find({
      order: {
        dayNumber: 'ASC',
      },
    });
  }

  async findByDayNumber(dayNumber: number): Promise<Tweet | null> {
    return this.tweetRepository.findOne({
      where: { dayNumber },
    });
  }

  async findByDate(date: Date): Promise<Tweet | null> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return this.tweetRepository.findOne({
      where: {
        createdAt: Between(startOfDay, endOfDay),
      },
    });
  }

  async save(tweet: Partial<Tweet>): Promise<Tweet> {
    return this.tweetRepository.save(tweet);
  }

  async saveMany(tweets: Partial<Tweet>[]): Promise<Tweet[]> {
    return this.tweetRepository.save(tweets);
  }

  async getLatestDayNumber(): Promise<number> {
    const result = await this.tweetRepository.findOne({
      order: {
        dayNumber: 'DESC',
      },
    });
    
    return result ? result.dayNumber : 0;
  }
}
