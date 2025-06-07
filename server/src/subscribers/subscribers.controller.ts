import { Controller, Post, Body, Get, Param, HttpCode } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  @HttpCode(200)
  async subscribe(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscribersService.create(createSubscriberDto);
  }

  @Post('unsubscribe/:email')
  @HttpCode(200)
  async unsubscribe(@Param('email') email: string) {
    return this.subscribersService.unsubscribe(email);
  }
}
