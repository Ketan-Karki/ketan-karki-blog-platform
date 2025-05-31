<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header />
    
    <div v-if="notification" 
      class="fixed top-20 right-4 p-4 rounded shadow-lg z-50 transition-all duration-300"
      :class="notification.type === 'error' ? 'bg-red-100 text-red-700 border-l-4 border-red-500' : 
              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500' : 
              'bg-green-100 text-green-700 border-l-4 border-green-500'"
    >
      <div class="flex justify-between items-center">
        <p>{{ notification.message }}</p>
        <button @click="clearNotification" class="ml-4 text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
    </div>

    <main class="flex-grow container mx-auto py-8 px-4">
      <h1 class="text-3xl font-bold text-center mb-8">Daily Blog</h1>
      
      <!-- Loading State -->
      <div v-if="dailyBlogStore.loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="dailyBlogStore.error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ dailyBlogStore.error }}</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="!dailyBlogStore.tweets || dailyBlogStore.tweets.length === 0" class="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="text-lg font-semibold mb-2">No tweets found</h3>
        <p class="text-gray-500 mb-6">There are no tweets available to display.</p>
        <button 
          @click="refreshData" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="refreshing"
        >
          <svg v-if="refreshing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ refreshing ? 'Refreshing...' : 'Refresh Tweets' }}</span>
        </button>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-6 p-4">
        <!-- Calendar Section -->
        <div class="w-full lg:w-2/3">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">Daily Blog Calendar</h2>
              <div class="flex items-center space-x-2">
                <button 
                  @click="previousMonth" 
                  class="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Previous month"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <span class="text-lg font-medium">{{ currentMonthName }} {{ currentYear }}</span>
                <button 
                  @click="nextMonth" 
                  class="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Next month"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button 
                  @click="goToToday" 
                  class="ml-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Today
                </button>
              </div>
            </div>
            
            <!-- Calendar Grid -->
            <div class="calendar-grid">
              <!-- Weekday Headers -->
              <div class="grid grid-cols-7 mb-2">
                <div v-for="day in weekdays" :key="day" class="text-center font-medium text-gray-500 py-2">
                  {{ day }}
                </div>
              </div>
              
              <!-- Calendar Days -->
              <div class="grid grid-cols-7 gap-1">
                <div 
                  v-for="day in calendarDays" 
                  :key="day.date" 
                  class="calendar-day relative"
                  :class="{
                    'bg-gray-100': day.isCurrentMonth === false,
                    'cursor-pointer hover:bg-blue-50': day.isCurrentMonth,
                    'border-2 border-blue-500': isToday(day.date),
                    'bg-blue-100': isSelectedDate(day.date)
                  }"
                  @click="day.isCurrentMonth && selectDate(day.date)"
                >
                  <div class="h-24 p-1 flex flex-col">
                    <span class="text-sm" :class="{'text-gray-400': !day.isCurrentMonth, 'font-bold': isToday(day.date)}">
                      {{ day.dayNumber }}
                    </span>
                    
                    <!-- Tweet Indicator -->
                    <div v-if="day.hasTweet" class="mt-1">
                      <div 
                        class="text-xs inline-flex items-center px-2 py-1 rounded-full bg-blue-500 text-white"
                        @click.stop="selectTweetForDate(day.date)"
                      >
                        Day {{ day.tweetDayNumber }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Refresh Button -->
            <div class="mt-6 flex justify-end">
              <button 
                @click="refreshData" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :disabled="refreshing"
              >
                <svg v-if="refreshing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{{ refreshing ? 'Refreshing...' : 'Refresh Tweets' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Tweet Display Section -->
        <div class="w-full lg:w-1/3">
          <TweetCard v-if="dailyBlogStore.selectedTweet" :tweet="dailyBlogStore.selectedTweet"></TweetCard>
          
          <div v-else class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p class="text-gray-500 text-center">Select a date from the calendar to view the daily blog entry</p>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.calendar-day {
  min-height: 6rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.calendar-day:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDailyBlogStore } from "~/stores/dailyBlog";
import { format, parseISO, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, addDays, isSameDay, isSameMonth, isToday as isDateToday } from "date-fns";
import TweetCard from "~/components/TweetCard.vue";

const dailyBlogStore = useDailyBlogStore();
const refreshing = ref(false);
const currentDate = ref(new Date());
const selectedDate = ref(null);

// Weekday names
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Notification system
const notification = ref(null);
const notificationTimeout = ref(null);

const showNotification = (message, type = 'info') => {
  // Clear any existing notification timeout
  if (notificationTimeout.value) {
    clearTimeout(notificationTimeout.value);
  }
  
  // Set the new notification
  notification.value = { message, type };
  
  // Auto-dismiss after 5 seconds
  notificationTimeout.value = setTimeout(() => {
    notification.value = null;
  }, 5000);
};

const clearNotification = () => {
  notification.value = null;
  if (notificationTimeout.value) {
    clearTimeout(notificationTimeout.value);
  }
};

// Calendar navigation
const previousMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1);
};

const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1);
};

const goToToday = () => {
  currentDate.value = new Date();
};

// Calendar computed properties
const currentMonthName = computed(() => {
  return format(currentDate.value, 'MMMM');
});

const currentYear = computed(() => {
  return format(currentDate.value, 'yyyy');
});

const calendarDays = computed(() => {
  const monthStart = startOfMonth(currentDate.value);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = [];
  let day = startDate;
  
  while (day <= endDate) {
    const formattedDate = format(day, 'yyyy-MM-dd');
    const tweet = dailyBlogStore.getTweetByDate(day);
    
    days.push({
      date: new Date(day),
      dayNumber: format(day, 'd'),
      isCurrentMonth: isSameMonth(day, monthStart),
      hasTweet: !!tweet,
      tweetDayNumber: tweet ? tweet.dayNumber : null
    });
    
    day = addDays(day, 1);
  }
  
  return days;
});

// Helper functions
const isToday = (date) => {
  return isDateToday(date);
};

const isSelectedDate = (date) => {
  return selectedDate.value && isSameDay(date, selectedDate.value);
};

const selectDate = (date) => {
  selectedDate.value = date;
  const tweet = dailyBlogStore.getTweetByDate(date);
  
  if (tweet) {
    dailyBlogStore.selectTweet(tweet);
    showNotification(`Showing tweet for Day ${tweet.dayNumber}`, 'success');
  } else {
    dailyBlogStore.selectTweet(null);
    const formattedDate = format(date, 'MMMM d, yyyy');
    showNotification(`No tweet found for ${formattedDate}`, 'warning');
  }
};

const selectTweetForDate = (date) => {
  selectedDate.value = date;
  const tweet = dailyBlogStore.getTweetByDate(date);
  
  if (tweet) {
    dailyBlogStore.selectTweet(tweet);
    showNotification(`Showing tweet for Day ${tweet.dayNumber}`, 'success');
  }
};

// Refresh tweets
const refreshData = async () => {
  try {
    refreshing.value = true;
    await dailyBlogStore.refreshTweets();
    showNotification('Tweets refreshed successfully', 'success');
  } catch (error) {
    showNotification(`Error refreshing tweets: ${error.message}`, 'error');
  } finally {
    refreshing.value = false;
  }
};

onMounted(async () => {
  try {
    await dailyBlogStore.fetchTweets();
  } catch (error) {
    console.error('Error fetching tweets:', error);
  }
});
</script>

<style scoped>
.calendar-day {
  min-height: 6rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.calendar-day:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.spinner {
  border: 4px solid rgba(29, 161, 242, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-top: 4px solid #1DA1F2;
  animation: spin 1s linear infinite;
}

.spinner-sm {
  border: 2px solid rgba(255, 255, 255, 0.3);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
