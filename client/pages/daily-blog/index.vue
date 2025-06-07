<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    
    <!-- Notification Toast -->
    <div
      v-if="notification.show"
      class="fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg transition-all duration-300 transform z-50 flex items-center"
      :class="{
        'bg-primary-50 text-primary-800 border border-primary-200':
          notification.type === 'success',
        'bg-red-50 text-red-800 border border-red-200':
          notification.type === 'error',
        'bg-yellow-50 text-yellow-800 border border-yellow-200':
          notification.type === 'warning',
        'animate-fade-in-down': !notification.animating,
        'animate-fade-out-up': notification.animating
      }"
    >
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center">
          <!-- Success Icon -->
          <div v-if="notification.type === 'success'" class="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <!-- Error Icon -->
          <div v-if="notification.type === 'error'" class="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <!-- Warning Icon -->
          <div v-if="notification.type === 'warning'" class="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <p class="font-medium">{{ notification.message }}</p>
          </div>
        </div>
        <button
          @click="clearNotification"
          class="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded-full p-1 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <main class="flex-grow max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400 font-heading">Daily Blog</h1>
        <p class="mt-3 text-lg text-gray-600">Follow my journey through daily tweets</p>
      </div>

      <!-- Loading State -->
      <div
        v-if="dailyBlogStore.loading"
        class="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <svg
          class="animate-spin h-12 w-12 text-primary-600 mb-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <h3 class="text-xl font-semibold text-gray-800 font-heading mb-2">Loading Daily Blog Entries</h3>
        <p class="text-gray-500 mt-1">Please wait while we fetch your daily blog entries...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="dailyBlogStore.error"
        class="bg-red-50 border border-red-200 rounded-xl shadow-sm p-8 mb-8"
        role="alert"
      >
        <div class="flex items-center mb-4">
          <svg class="w-6 h-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <h3 class="font-heading font-semibold text-lg text-red-700">Error Loading Daily Blog Entries</h3>
        </div>
        <p class="text-red-600 ml-9">{{ dailyBlogStore.error }}</p>
        <div class="mt-6 ml-9">
          <button
            @click="refreshData"
            class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-lg shadow-sm bg-white text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!dailyBlogStore.tweets || dailyBlogStore.tweets.length === 0"
        class="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 rounded-xl border border-gray-100"
      >
        <svg
          class="w-20 h-20 text-gray-300 mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <h3 class="text-xl font-semibold text-gray-800 mb-2 font-heading">
          No Daily Blog Entries Found
        </h3>
        <p class="text-gray-500 mb-8 max-w-md">
          There are no tweets available for the selected date range. Try adjusting your filter or refreshing the data.
        </p>
        <button
          @click="refreshData"
          class="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <svg
            class="-ml-1 mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>{{ refreshing ? "Refreshing..." : "Refresh Tweets" }}</span>
        </button>
      </div>
      
      <!-- Date Filter and Controls Section -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-800 font-heading">Date Filter</h2>
            <p class="text-sm text-gray-500 mt-1">Filter tweets by date range</p>
          </div>
          
          <!-- Refresh Button (moved to the right side of the header) -->
          <button
            @click="refreshData"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            :disabled="refreshing"
          >
            <svg
              v-if="refreshing"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ refreshing ? "Refreshing..." : "Refresh Tweets" }}</span>
          </button>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="relative">
            <label
              for="startDate"
              class="text-sm font-medium text-gray-700 mb-1.5 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Start Date
            </label>
            <div>
              <input
                type="date"
                id="startDate"
                v-model="startDate"
                @change="applyDateFilter"
                class="block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
          <div class="relative">
            <label
              for="endDate"
              class="text-sm font-medium text-gray-700 mb-1.5 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              End Date
            </label>
            <div>
              <input
                type="date"
                id="endDate"
                v-model="endDate"
                @change="applyDateFilter"
                class="block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>
          <div class="flex items-end">
            <button
              @click="resetDateFilter"
              class="inline-flex items-center px-4 py-2.5 border border-gray-200 text-sm font-medium rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <svg
                class="-ml-1 mr-2 h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Reset Filters
            </button>
          </div>
        </div>

        <!-- Tweet Cards Section -->
        <div class="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <div
            class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
          >
            <div>
              <h2 class="text-xl font-semibold text-gray-800 font-heading">
                Daily Blog Entries
              </h2>
              <p class="text-sm text-gray-500 mt-1">Day by day journey through my coding adventure</p>
            </div>

            <!-- Pagination Controls -->
            <div class="flex items-center space-x-1 bg-gray-50 rounded-lg p-1 border border-gray-100">
              <button
                @click="goToFirstPage"
                class="p-2 rounded-md hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all"
                :disabled="currentPage === 1"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                <svg
                  class="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                @click="previousPage"
                class="p-2 rounded-md hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all"
                :disabled="currentPage === 1"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                <svg
                  class="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <span class="px-3 py-1 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm">
                {{ currentPage }} / {{ totalPages }}
              </span>
              <button
                @click="nextPage"
                class="p-2 rounded-md hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all"
                :disabled="currentPage === totalPages"
                :class="{
                  'opacity-50 cursor-not-allowed': currentPage === totalPages,
                }"
              >
                <svg
                  class="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                @click="goToLastPage"
                class="p-2 rounded-md hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all"
                :disabled="currentPage === totalPages"
                :class="{
                  'opacity-50 cursor-not-allowed': currentPage === totalPages,
                }"
              >
                <svg
                  class="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div v-if="filteredTweets.length === 0" class="py-16 text-center bg-gray-50 rounded-xl border border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 text-gray-300 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 class="text-xl font-semibold mb-2 font-heading text-gray-800">
              No Tweets Found
            </h3>
            <p class="text-gray-500 max-w-md mx-auto">
              No tweets found for the selected date range. Try selecting a different date range or reset the filter.
            </p>
          </div>
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <div
              v-for="tweet in paginatedTweets"
              :key="tweet.id"
              class="col-span-1 h-full"
            >
              <TweetCard 
                :tweet="tweet" 
                @click="selectTweet"
                class="h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              />
            </div>
          </div>
          <div class="mt-10 flex justify-center">
            <nav class="flex items-center space-x-1 bg-gray-50 rounded-lg p-1 border border-gray-100" aria-label="Pagination">
              <button
                @click="goToFirstPage"
                class="px-3 py-2 rounded-md hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all text-sm font-medium text-gray-700"
                :disabled="currentPage === 1"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                First
              </button>
              <button
                @click="previousPage"
                class="px-3 py-2 rounded-md hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all text-sm font-medium text-gray-700"
                :disabled="currentPage === 1"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                Previous
              </button>
              <div class="flex items-center">
                <span class="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-sm">
                  {{ currentPage }} / {{ totalPages }}
                </span>
              </div>
              <button
                @click="nextPage"
                class="px-3 py-2 rounded-md hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all text-sm font-medium text-gray-700"
                :disabled="currentPage === totalPages"
                :class="{
                  'opacity-50 cursor-not-allowed': currentPage === totalPages,
                }"
              >
                Next
              </button>
              <button
                @click="goToLastPage"
                class="px-3 py-2 rounded-md hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 transition-all text-sm font-medium text-gray-700"
                :disabled="currentPage === totalPages"
                :class="{
                  'opacity-50 cursor-not-allowed': currentPage === totalPages,
                }"
              >
                Last
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>

    <Footer />
    
    <!-- Tweet Detail Dialog -->
    <TweetDetailDialog
      :show="!!selectedTweet"
      :tweet="selectedTweet"
      @close="closeSelectedTweet"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {
  format,
  parseISO,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
} from "date-fns";
import { useDailyBlogStore } from "~/stores/dailyBlog";
import TweetCard from "~/components/TweetCard.vue";
import TweetDetailDialog from "~/components/TweetDetailDialog.vue";

const dailyBlogStore = useDailyBlogStore();

// Loading and error states
const loading = ref(false);
const error = ref(null);
const refreshing = ref(false);

// Pagination state
const currentPage = ref(1);
const pageSize = ref(15); // Number of tweets per page

// Date filter state
const startDate = ref("");
const endDate = ref("");
const isFiltered = computed(() => {
  return !!startDate.value || !!endDate.value;
});

// Apply date filter
const applyDateFilter = () => {
  currentPage.value = 1; // Reset to first page when filter changes
  
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    if (start > end) {
      showNotification("Start date cannot be after end date", "error");
      startDate.value = "";
      endDate.value = "";
      return;
    }
    showNotification("Date filter applied successfully", "success");
  } else if (startDate.value || endDate.value) {
    // Show notification if at least one date is set
    showNotification("Date filter applied successfully", "success");
  }
};

// Notification system
const notification = ref({
  show: false,
  message: "",
  type: "",
  animating: false
});
const notificationTimeout = ref(null);
const notificationAnimationTimeout = ref(null);

const showNotification = (message, type) => {
  // Clear existing notification and animation timers if any
  if (notificationTimeout.value) {
    clearTimeout(notificationTimeout.value);
  }
  if (notificationAnimationTimeout.value) {
    clearTimeout(notificationAnimationTimeout.value);
  }

  // Set the new notification
  notification.value = { show: true, message, type, animating: false };

  // Auto-dismiss after 5 seconds
  notificationTimeout.value = setTimeout(() => {
    // Start fade-out animation
    notification.value.animating = true;
    
    // Actually hide the notification after animation completes
    notificationAnimationTimeout.value = setTimeout(() => {
      notification.value.show = false;
      notification.value.animating = false;
    }, 300); // Match animation duration
  }, 5000);
};

const clearNotification = () => {
  // Start fade-out animation
  notification.value.animating = true;
  
  // Clear existing timers
  if (notificationTimeout.value) {
    clearTimeout(notificationTimeout.value);
  }
  if (notificationAnimationTimeout.value) {
    clearTimeout(notificationAnimationTimeout.value);
  }
  
  // Actually hide the notification after animation completes
  notificationAnimationTimeout.value = setTimeout(() => {
    notification.value.show = false;
    notification.value.animating = false;
  }, 300); // Match animation duration
};

const filteredTweets = computed(() => {
  if (!dailyBlogStore.tweets || dailyBlogStore.tweets.length === 0) {
    return [];
  }

  if (!startDate.value && !endDate.value) {
    // Always sort tweets by date (newest first) even when no filters are applied
    return [...dailyBlogStore.tweets].sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime();
    });
  }

  return dailyBlogStore.tweets
    .filter((tweet) => {
      if (!tweet.createdAt) return false;

      const tweetDate = parseISO(tweet.createdAt);
      const parsedStartDate = startDate.value
        ? parseISO(startDate.value)
        : null;
      const parsedEndDate = endDate.value ? parseISO(endDate.value) : null;

      if (parsedStartDate && !parsedEndDate) {
        return (
          isAfter(tweetDate, parsedStartDate) ||
          isSameDay(tweetDate, parsedStartDate)
        );
      }

      if (!parsedStartDate && parsedEndDate) {
        return (
          isBefore(tweetDate, parsedEndDate) ||
          isSameDay(tweetDate, parsedEndDate)
        );
      }

      if (parsedStartDate && parsedEndDate) {
        return (
          (isAfter(tweetDate, parsedStartDate) ||
            isSameDay(tweetDate, parsedStartDate)) &&
          (isBefore(tweetDate, parsedEndDate) ||
            isSameDay(tweetDate, parsedEndDate))
        );
      }

      return true;
    })
    .sort((a, b) => {
      // Sort tweets by date (newest first)
      if (!a.createdAt || !b.createdAt) return 0;
      return parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime();
    });
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredTweets.value.length / pageSize.value));
});

const paginatedTweets = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredTweets.value.slice(startIndex, endIndex);
});

// Pagination functions
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const goToFirstPage = () => {
  if (currentPage.value !== 1) {
    currentPage.value = 1;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const goToLastPage = () => {
  if (currentPage.value !== totalPages.value) {
    currentPage.value = totalPages.value;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// This function is now replaced by applyDateFilter

const resetDateFilter = () => {
  startDate.value = "";
  endDate.value = "";
  // Reset to first page when filter is reset
  currentPage.value = 1;
  showNotification("Date filter reset", "success");
};

// Tweet selection and dialog management
const selectedTweet = computed(() => dailyBlogStore.selectedTweet);

function selectTweet(tweet) {
  dailyBlogStore.selectTweet(tweet);
}

function closeSelectedTweet() {
  dailyBlogStore.selectTweet(null);
}

async function fetchData() {
  try {
    loading.value = true;
    error.value = null;
    await dailyBlogStore.fetchTweets();
  } catch (err) {
    error.value = err.message || "Failed to fetch tweets";
    notify({
      title: "Error",
      text: error.value,
      type: "error",
    });
  } finally {
    loading.value = false;
  }
}

async function refreshData() {
  try {
    refreshing.value = true;
    error.value = null;
    await dailyBlogStore.refreshTweets();
    notify({
      title: "Success",
      text: "Tweets refreshed successfully",
      type: "success",
    });
  } catch (err) {
    error.value = err.message || "Failed to refresh tweets";
    notify({
      title: "Error",
      text: error.value,
      type: "error",
    });
  } finally {
    refreshing.value = false;
  }
}

// Watch for changes in filtered tweets to update pagination
watch(filteredTweets, () => {
  // If current page is now invalid (e.g., after filtering), reset to page 1
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
});

// Initial data fetch
onMounted(async () => {
  await fetchData();
});
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}
</style>
