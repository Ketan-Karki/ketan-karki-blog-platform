import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { format, parseISO } from 'date-fns';

interface Tweet {
  id: string;
  text: string;
  createdAt: string;
  dayNumber: number;
  publicMetrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  conversationId?: string;
  authorId?: string;
}

export const useDailyBlogStore = defineStore("dailyBlog", () => {
  const tweets = ref<Tweet[]>([]);
  const selectedTweet = ref<Tweet | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const refreshing = ref(false);
  const config = useRuntimeConfig();

  // Get all tweets from the database
  const fetchTweets = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${config.public.apiBase}/api/twitter/tweets`);
      const data = await response.json();
      
      if (data.success && Array.isArray(data.tweets)) {
        tweets.value = data.tweets;
        
        if (tweets.value.length === 0) {
          console.log('No tweets found in database');
        } else {
          console.log(`Loaded ${tweets.value.length} tweets from database`);
        }
      } else {
        error.value = data.message || "Failed to fetch tweets from database";
        console.error("API error:", data);
      }
    } catch (err) {
      console.error("Error fetching tweets:", err);
      error.value = "Network error while fetching tweets. Please check your connection.";
    } finally {
      loading.value = false;
    }
  };

  // Manually trigger a refresh of tweets from Twitter API
  const refreshTweets = async () => {
    refreshing.value = true;
    error.value = null;
    try {
      const response = await fetch(`${config.public.apiBase}/api/twitter/fetch-tweets`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        // Refetch tweets after successful refresh
        await fetchTweets();
        return true;
      } else {
        // Show the specific error message from the API
        error.value = data.message || "Failed to refresh tweets";
        console.error("Twitter API error:", data.message);
        return false;
      }
    } catch (err) {
      console.error("Error refreshing tweets:", err);
      error.value = "Network error while refreshing tweets. Please check your connection.";
      return false;
    } finally {
      refreshing.value = false;
    }
  };

  // Select a tweet
  const selectTweet = (tweet: Tweet) => {
    selectedTweet.value = tweet;
  };

  // Get tweet by date
  const getTweetByDate = (date: Date) => {
    try {
      // Validate the input date
      if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        console.error("Invalid date provided to getTweetByDate:", date);
        return null;
      }
      
      const formattedDateToFind = format(date, "yyyy-MM-dd");
      console.log(`Looking for tweets on date: ${formattedDateToFind}`);
      
      // First try to find by exact date match
      const exactMatch = tweets.value.find((tweet) => {
        try {
          // Check if createdAt is a valid date string
          if (!tweet.createdAt) return false;
          
          const tweetDate = parseISO(tweet.createdAt);
          
          // Check if the parsed date is valid
          if (isNaN(tweetDate.getTime())) return false;
          
          const tweetFormattedDate = format(tweetDate, "yyyy-MM-dd");
          const isMatch = tweetFormattedDate === formattedDateToFind;
          
          if (isMatch) {
            console.log(`Found tweet for ${formattedDateToFind}: Day ${tweet.dayNumber}`);
          }
          
          return isMatch;
        } catch (err) {
          console.error(`Error parsing date for tweet ${tweet.id}:`, err);
          return false;
        }
      });
      
      if (exactMatch) return exactMatch;
      
      // If no exact match, check if any tweet's day number corresponds to the day of the month
      // This is a fallback for calendar navigation
      const dayOfMonth = date.getDate();
      const dayMatch = tweets.value.find(tweet => tweet.dayNumber === dayOfMonth);
      
      if (dayMatch) {
        console.log(`Found tweet by day number ${dayOfMonth}: Day ${dayMatch.dayNumber}`);
      }
      
      return dayMatch || null;
    } catch (err) {
      console.error("Error in getTweetByDate:", err);
      return null;
    }
  };

  // Get tweet by day number
  const getTweetByDay = (day: number) => {
    return tweets.value.find((tweet) => tweet.dayNumber === day);
  };

  // Get all available dates that have tweets
  const availableDates = computed(() => {
    return tweets.value
      .filter(tweet => {
        // Filter out tweets with invalid dates
        try {
          if (!tweet.createdAt) return false;
          const date = parseISO(tweet.createdAt);
          return !isNaN(date.getTime()); // Check if date is valid
        } catch (err) {
          console.error(`Invalid date for tweet ${tweet.id}:`, err);
          return false;
        }
      })
      .map(tweet => {
        try {
          return {
            date: parseISO(tweet.createdAt),
            dayNumber: tweet.dayNumber
          };
        } catch (err) {
          console.error(`Error mapping date for tweet ${tweet.id}:`, err);
          return null;
        }
      })
      .filter(item => item !== null); // Filter out any null items
  });

  return {
    tweets,
    selectedTweet,
    loading,
    error,
    refreshing,
    availableDates,
    fetchTweets,
    refreshTweets,
    selectTweet,
    getTweetByDate,
    getTweetByDay,
  };
});
