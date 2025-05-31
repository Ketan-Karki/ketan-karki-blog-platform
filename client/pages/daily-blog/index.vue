<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    
    <!-- Notification Toast -->
    <div
      v-if="notification.show"
      class="fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-md transition-all duration-300 transform z-50 flex items-center"
      :class="{
        'bg-green-50 text-green-800 border-l-4 border-green-500':
          notification.type === 'success',
        'bg-red-50 text-red-800 border-l-4 border-red-500':
          notification.type === 'error',
        'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500':
          notification.type === 'warning',
      }"
    >
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center">
          <!-- Success Icon -->
          <svg v-if="notification.type === 'success'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <!-- Error Icon -->
          <svg v-if="notification.type === 'error'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <!-- Warning Icon -->
          <svg v-if="notification.type === 'warning'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <p>{{ notification.message }}</p>
        </div>
        <button
          @click="clearNotification"
          class="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <main class="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-gray-900">Daily Blog</h1>
        <p class="mt-2 text-lg text-gray-600">Follow my journey through daily tweets</p>
      </div>

      <!-- Loading State -->
      <div
        v-if="dailyBlogStore.loading"
        class="flex justify-center items-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="dailyBlogStore.error"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
        role="alert"
      >
        <p class="font-bold">Error</p>
        <p>{{ dailyBlogStore.error }}</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!dailyBlogStore.tweets || dailyBlogStore.tweets.length === 0"
        class="text-center py-12"
      >
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
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 class="text-lg font-semibold mb-2">No tweets found</h3>
        <p class="text-gray-500 mb-6">
          There are no tweets available to display.
        </p>
        <button
          @click="refreshData"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
      
      <!-- Date Filter and Controls Section -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-800">Date Filter</h2>
          
          <!-- Refresh Button (moved to the right side of the header) -->
          <button
            @click="refreshData"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            <svg
              v-else
              class="-ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="relative">
            <label
              for="startDate"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Start Date</label
            >
            <div>
              <input
                type="date"
                id="startDate"
                v-model="startDate"
                @change="applyDateFilter"
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          <div class="relative">
            <label
              for="endDate"
              class="block text-sm font-medium text-gray-700 mb-1"
              >End Date</label
            >
            <div>
              <input
                type="date"
                id="endDate"
                v-model="endDate"
                @change="applyDateFilter"
                class="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          <div class="flex items-end">
            <button
              @click="resetDateFilter"
              class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset Filter
            </button>
          </div>
        </div>

        <!-- Tweet Cards Section -->
        <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div
            class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
          >
            <h2 class="text-xl font-semibold text-gray-800">
              Daily Blog Entries
            </h2>
            <div
              class="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg shadow-sm"
            >
              <button
                @click="goToFirstPage"
                class="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="First page"
                :disabled="currentPage === 1"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                @click="previousPage"
                class="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Previous page"
                :disabled="currentPage === 1"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <span class="text-sm font-medium text-gray-700 px-2"
                >Page {{ currentPage }} of {{ totalPages }}</span
              >
              <button
                @click="nextPage"
                class="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Next page"
                :disabled="currentPage === totalPages"
                :class="{
                  'opacity-50 cursor-not-allowed': currentPage === totalPages,
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                @click="goToLastPage"
                class="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Last page"
                :disabled="currentPage === totalPages"
                :class="{
                  'opacity-50 cursor-not-allowed': currentPage === totalPages,
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div v-if="filteredTweets.length === 0" class="py-12 text-center">
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
            <h3 class="text-lg font-semibold mb-2">
              No tweets found for the selected date range
            </h3>
            <p class="text-gray-500">
              Try selecting a different date range or reset the filter.
            </p>
          </div>
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="tweet in paginatedTweets"
              :key="tweet.id"
              class="h-full"
            >
              <TweetCard
                :tweet="tweet"
                @click="selectTweet(tweet)"
                class="h-full cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl rounded-xl overflow-hidden border border-gray-100"
              />
            </div>
          </div>
          <div class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2" aria-label="Pagination">
              <button
                @click="goToFirstPage"
                class="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :disabled="currentPage === 1"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                First
              </button>
              <button
                @click="previousPage"
                class="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :disabled="currentPage === 1"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              >
                Previous
              </button>
              <div class="flex items-center">
                <span class="px-3 py-1 text-sm text-gray-700">
                  Page {{ currentPage }} of {{ totalPages }}
                </span>
              </div>
              <button
                @click="nextPage"
                class="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :disabled="currentPage === totalPages"
                :class="{
                  'opacity-50 cursor-not-allowed': currentPage === totalPages,
                }"
              >
                Next
              </button>
              <button
                @click="goToLastPage"
                class="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
});
const notificationTimeout = ref(null);

const showNotification = (message, type) => {
  // Clear existing notification if any
  if (notificationTimeout.value) {
    clearTimeout(notificationTimeout.value);
  }

  // Set the new notification
  notification.value = { show: true, message, type };

  // Auto-dismiss after 5 seconds
  notificationTimeout.value = setTimeout(() => {
    notification.value.show = false;
  }, 5000);
};

const clearNotification = () => {
  notification.value.show = false;
  if (notificationTimeout.value) {
    clearTimeout(notificationTimeout.value);
  }
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

// Tweet selection
function selectTweet(tweet) {
  dailyBlogStore.selectTweet(tweet);
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
