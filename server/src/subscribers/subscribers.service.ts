import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './subscribers.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private subscribersRepository: Repository<Subscriber>,
  ) {}

  async create(createSubscriberDto: CreateSubscriberDto): Promise<{ message: string }> {
    const { email } = createSubscriberDto;
    
    try {
      // Check if subscriber already exists
      const existingSubscriber = await this.subscribersRepository.findOne({ 
        where: { email } 
      });
      
      if (existingSubscriber) {
        if (!existingSubscriber.isActive) {
          // Reactivate subscriber
          existingSubscriber.isActive = true;
          await this.subscribersRepository.save(existingSubscriber);
          return { message: 'Subscription reactivated successfully!' };
        }
        return { message: 'You are already subscribed!' };
      }
      
      // Create new subscriber
      const subscriber = this.subscribersRepository.create({ email });
      await this.subscribersRepository.save(subscriber);
      return { message: 'Subscribed successfully!' };
    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique constraint violation code
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async unsubscribe(email: string): Promise<{ message: string }> {
    const subscriber = await this.subscribersRepository.findOne({
      where: { email }
    });

    if (!subscriber) {
      return { message: 'Email not found in subscription list' };
    }

    subscriber.isActive = false;
    await this.subscribersRepository.save(subscriber);
    return { message: 'Unsubscribed successfully' };
  }

  async getAllActive(): Promise<Subscriber[]> {
    return this.subscribersRepository.find({
      where: { isActive: true }
    });
  }
}
