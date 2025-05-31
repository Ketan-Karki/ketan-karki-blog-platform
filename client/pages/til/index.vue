<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header />

    <div
      v-if="notification.show"
      class="fixed top-4 right-4 max-w-sm p-4 rounded-lg shadow-lg transition-all duration-300 transform z-50"
      :class="{
        'bg-green-100 text-green-800 border border-green-200':
          notification.type === 'success',
        'bg-red-100 text-red-800 border border-red-200':
          notification.type === 'error',
        'bg-yellow-100 text-yellow-800 border border-yellow-200':
          notification.type === 'warning',
      }"
    >
      <div class="flex justify-between items-center">
        <p>{{ notification.message }}</p>
        <button
          @click="clearNotification"
          class="ml-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>

    <main class="flex-grow container mx-auto py-8 px-4">
      <h1 class="text-3xl font-bold text-center mb-8">Today I Learned</h1>

      <!-- Loading State -->
      <div
        v-if="tilStore.loading"
        class="flex justify-center items-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="tilStore.error"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
        role="alert"
      >
        <p class="font-bold">Error</p>
        <p>{{ tilStore.error }}</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!tilStore.tils || tilStore.tils.length === 0"
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <h3 class="text-lg font-semibold mb-2">No TIL entries found</h3>
        <p class="text-gray-500 mb-6">
          There are no "Today I Learned" entries available to display.
        </p>
      </div>

      <div v-else class="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full">
        <!-- Categories Filter -->
        <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div class="w-full">
              <h2 class="text-xl font-semibold mb-5 text-gray-800">Categories</h2>
              <div class="flex flex-wrap gap-2">
                <button
                  @click="clearCategoryFilter"
                  class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  :class="{
                    'bg-blue-600 text-white': !selectedCategory,
                    'bg-gray-200 text-gray-700 hover:bg-gray-300': selectedCategory
                  }"
                >
                  All
                </button>
                <button
                  v-for="category in tilStore.categories"
                  :key="category"
                  @click="filterByCategory(category)"
                  class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  :class="{
                    'bg-blue-600 text-white': selectedCategory === category,
                    'bg-gray-200 text-gray-700 hover:bg-gray-300': selectedCategory !== category
                  }"
                >
                  {{ category }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- TIL Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="til in paginatedTILs"
            :key="til.id"
            class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800 line-clamp-2">{{ til.title }}</h3>
              </div>
              
              <div class="mb-4">
                <p class="text-gray-600 line-clamp-3">{{ til.content }}</p>
              </div>
              
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-500">
                  {{ tilStore.formatDate(til.createdAt) }}
                </div>
                
                <div v-if="til.category" class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {{ til.category }}
                </div>
              </div>
              
              <NuxtLink 
                :to="`/til/${til.id}`"
                class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Read More
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8">
          <div class="flex items-center space-x-2">
            <button
              @click="goToFirstPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded border"
              :class="{
                'bg-gray-200 text-gray-600 cursor-not-allowed': currentPage === 1,
                'bg-white text-gray-700 hover:bg-gray-100': currentPage !== 1
              }"
            >
              &laquo;
            </button>
            
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded border"
              :class="{
                'bg-gray-200 text-gray-600 cursor-not-allowed': currentPage === 1,
                'bg-white text-gray-700 hover:bg-gray-100': currentPage !== 1
              }"
            >
              &lsaquo;
            </button>
            
            <span class="px-3 py-1 text-gray-700">
              {{ currentPage }} / {{ totalPages }}
            </span>
            
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded border"
              :class="{
                'bg-gray-200 text-gray-600 cursor-not-allowed': currentPage === totalPages,
                'bg-white text-gray-700 hover:bg-gray-100': currentPage !== totalPages
              }"
            >
              &rsaquo;
            </button>
            
            <button
              @click="goToLastPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded border"
              :class="{
                'bg-gray-200 text-gray-600 cursor-not-allowed': currentPage === totalPages,
                'bg-white text-gray-700 hover:bg-gray-100': currentPage !== totalPages
              }"
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useTILStore } from '~/stores/til';

// Store
const tilStore = useTILStore();

// Pagination
const currentPage = ref(1);
const pageSize = ref(9);
const selectedCategory = ref(null);

// Notification system
const notification = ref({
  show: false,
  message: '',
  type: 'success', // 'success', 'error', 'warning'
});

function showNotification(message, type = 'success') {
  notification.value = {
    show: true,
    message,
    type,
  };

  // Auto-hide after 5 seconds
  setTimeout(() => {
    clearNotification();
  }, 5000);
}

function clearNotification() {
  notification.value.show = false;
}

// Computed properties
const filteredTILs = computed(() => {
  if (!selectedCategory.value) {
    return tilStore.tils;
  }
  
  return tilStore.tils.filter(til => til.category === selectedCategory.value);
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredTILs.value.length / pageSize.value));
});

const paginatedTILs = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredTILs.value.slice(startIndex, endIndex);
});

// Pagination functions
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const goToFirstPage = () => {
  if (currentPage.value !== 1) {
    currentPage.value = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const goToLastPage = () => {
  if (currentPage.value !== totalPages.value) {
    currentPage.value = totalPages.value;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Category filtering
function filterByCategory(category) {
  selectedCategory.value = category;
  currentPage.value = 1; // Reset to first page when filter changes
}

function clearCategoryFilter() {
  selectedCategory.value = null;
  currentPage.value = 1; // Reset to first page when filter changes
}

// Watch for changes in filtered TILs to update pagination
watch(filteredTILs, () => {
  // If current page is now invalid (e.g., after filtering), reset to page 1
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
});

// Initial data fetch
onMounted(async () => {
  await tilStore.fetchTILs();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
