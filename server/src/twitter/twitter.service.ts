import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { TwitterApi, TweetV2 } from 'twitter-api-v2';
import { Cron } from '@nestjs/schedule';
import { TweetRepository } from './repositories/tweet.repository';
import { Tweet } from './entities/tweet.entity';
import { format, parseISO, differenceInDays } from 'date-fns';

@Injectable()
export class TwitterService {
  private twitterClient: TwitterApi | null = null;
  private readonly logger = new Logger(TwitterService.name);
  private readonly THREAD_START_DATE = new Date('2024-09-20'); // Day 1 date
  private readonly ROOT_TWEET_ID = '1837186522673717386';

  constructor(private readonly tweetRepository: TweetRepository) {
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;
    if (bearerToken) {
      this.twitterClient = new TwitterApi(bearerToken);
      this.logger.log('Twitter API client initialized');
    } else {
      this.logger.error('Twitter bearer token not found in environment variables');
    }
  }

  /**
   * Get all tweets from the database
   */
  async getAllTweets(): Promise<{ success: boolean; tweets: Tweet[] }> {
    try {
      const tweets = await this.tweetRepository.findAll();
      return {
        success: true,
        tweets,
      };
    } catch (error) {
      this.logger.error(`Error fetching tweets from database: ${error.message}`, error.stack);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Scheduled job that runs daily at midnight to fetch the latest tweet
   */
  @Cron('0 0 0 * * *') // Run at midnight every day
  async fetchDailyTweet() {
    try {
      this.logger.log('Running scheduled job to fetch daily tweet');
      
      // Get the latest day number from the database
      const latestDayNumber = await this.tweetRepository.getLatestDayNumber();
      const nextDayNumber = latestDayNumber + 1;
      
      this.logger.log(`Fetching tweet for day ${nextDayNumber}`);
      
      // Fetch the latest tweets from Twitter API
      await this.fetchAndStoreLatestTweets();
      
      this.logger.log('Daily tweet fetch completed successfully');
    } catch (error) {
      this.logger.error(`Error in daily tweet fetch job: ${error.message}`, error.stack);
    }
  }

  /**
   * Manual trigger to fetch and store tweets
   */
  async fetchAndStoreLatestTweets(): Promise<{ success: boolean; message: string }> {
    try {
      // First check if we already have tweets in the database
      const existingTweets = await this.tweetRepository.findAll();
      
      if (existingTweets.length > 0) {
        this.logger.log(`Found ${existingTweets.length} existing tweets in the database`);
        return {
          success: true,
          message: `Using ${existingTweets.length} existing tweets from database. No need to fetch from Twitter API.`,
        };
      }
      
      if (!this.twitterClient) {
        throw new HttpException('Twitter API not configured', HttpStatus.SERVICE_UNAVAILABLE);
      }

      this.logger.log(`Fetching thread with ID: ${this.ROOT_TWEET_ID}`);
      
      // Get the root tweet first
      const rootTweet = await this.twitterClient.v2.singleTweet(this.ROOT_TWEET_ID, {
        expansions: ['referenced_tweets.id', 'author_id'],
        'tweet.fields': ['created_at', 'public_metrics', 'text', 'conversation_id'],
        'user.fields': ['name', 'username', 'profile_image_url'],
      });
      
      if (!rootTweet.data) {
        throw new HttpException('Root tweet not found', HttpStatus.NOT_FOUND);
      }
      
      this.logger.log(`Found root tweet with conversation ID: ${rootTweet.data.conversation_id}`);
      
      // Get all tweets in the conversation by the same author
      const conversationId = rootTweet.data.conversation_id;
      const authorId = rootTweet.data.author_id;
      
      // Collect all tweets in the thread
      const allTweets = await this.fetchEntireThread(conversationId, authorId);
      
      this.logger.log(`Found ${allTweets.length} tweets in the thread`);
      
      // Convert Twitter API tweets to our entity format and save to database
      const tweetEntities = allTweets.map(tweet => this.convertToTweetEntity(tweet));
      await this.tweetRepository.saveMany(tweetEntities);
      
      return {
        success: true,
        message: `Successfully fetched and stored ${tweetEntities.length} tweets`,
      };
    } catch (error) {
      this.logger.error(`Error fetching Twitter thread: ${error.message}`, error.stack);
      
      // Check if it's a rate limit error
      if (error.message && error.message.includes('429')) {
        return {
          success: false,
          message: 'Twitter API rate limit reached. Please try again later. Twitter limits API calls to prevent abuse.',
        };
      }
      
      // Check for other common Twitter API errors
      if (error.message && error.message.includes('401')) {
        return {
          success: false,
          message: 'Twitter API authentication failed. Please check your API credentials.',
        };
      }
      
      if (error.message && error.message.includes('403')) {
        return {
          success: false,
          message: 'Twitter API access forbidden. Your account may not have access to this resource.',
        };
      }
      
      // Generic error handler
      return {
        success: false,
        message: `Error fetching tweets: ${error.message || 'Unknown error'}. Please try again later.`,
      };
    }
  }

  /**
   * Convert a Twitter API tweet to our database entity
   */
  private convertToTweetEntity(tweet: TweetV2): Partial<Tweet> {
    const createdAt = parseISO(tweet.created_at);
    const dayNumber = differenceInDays(createdAt, this.THREAD_START_DATE) + 1;
    
    return {
      id: tweet.id,
      text: tweet.text,
      createdAt: createdAt,
      dayNumber: dayNumber,
      publicMetrics: tweet.public_metrics,
      conversationId: tweet.conversation_id,
      authorId: tweet.author_id,
    };
  }


  
  private async fetchEntireThread(conversationId: string, authorId: string): Promise<TweetV2[]> {
    let allTweets: TweetV2[] = [];
    let nextToken: string | undefined = undefined;
    let hasMorePages = true;

    try {
      this.logger.log(`Fetching tweets for conversation ID: ${conversationId} by author: ${authorId}`);
      
      // Try using the search API with conversation_id filter
      while (hasMorePages) {
        const response = await this.twitterClient.v2.search({
          query: `conversation_id:${conversationId} from:${authorId}`,
          max_results: 100,
          ...(nextToken ? { pagination_token: nextToken } : {}),
          'tweet.fields': ['created_at', 'public_metrics', 'text', 'conversation_id', 'author_id'],
          'user.fields': ['name', 'username', 'profile_image_url'],
        });
        
        // Log response for debugging
        this.logger.log(`Search API response status: ${response.meta?.result_count || 0} tweets found`);
        
        if (response.data && response.data.data && response.data.data.length > 0) {
          this.logger.log(`Found ${response.data.data.length} tweets in this page`);
          allTweets.push(...response.data.data);
        }
        
        // Check if there are more pages
        if (response.meta?.next_token) {
          nextToken = response.meta.next_token;
          this.logger.log(`Found next token: ${nextToken}, fetching next page...`);
        } else {
          hasMorePages = false;
        }
      }
      
      // If no tweets found with search API, try user timeline as fallback
      if (allTweets.length === 0) {
        this.logger.log('No tweets found with search API, trying user timeline as fallback');
        
        const timelineResponse = await this.twitterClient.v2.userTimeline(authorId, {
          max_results: 100,
          'tweet.fields': ['created_at', 'public_metrics', 'text', 'conversation_id', 'author_id'],
          'user.fields': ['name', 'username', 'profile_image_url'],
        });
        
        if (timelineResponse.data && timelineResponse.data.data && timelineResponse.data.data.length > 0) {
          // Filter tweets that belong to our conversation
          const threadTweets = timelineResponse.data.data.filter(tweet => 
            tweet.conversation_id === conversationId
          );
          
          this.logger.log(`Found ${threadTweets.length} tweets in the thread from user timeline`);
          allTweets.push(...threadTweets);
        }
      }
      
      // Sort tweets by created_at to ensure chronological order
      allTweets.sort((a, b) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
      
      return allTweets;
    } catch (error) {
      this.logger.error(`Error fetching thread: ${error.message}`, error.stack);
      return [];
    }
  }
}
