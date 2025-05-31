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
      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex justify-center items-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
        role="alert"
      >
        <p class="font-bold">Error</p>
        <p>{{ error }}</p>
        <div class="mt-4">
          <NuxtLink
            to="/til"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to TIL List
          </NuxtLink>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="til" class="max-w-4xl mx-auto">
        <!-- Breadcrumbs -->
        <nav class="flex mb-6" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <NuxtLink
                to="/"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  ></path>
                </svg>
                Home
              </NuxtLink>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <NuxtLink
                  to="/til"
                  class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                >
                  TIL
                </NuxtLink>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 line-clamp-1">
                  {{ til.title }}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <!-- TIL Content -->
        <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <h1 class="text-3xl font-bold text-gray-800">{{ til.title }}</h1>
            
            <div class="flex items-center space-x-2">
              <div v-if="til.category" class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {{ til.category }}
              </div>
              <div class="text-sm text-gray-500">
                {{ formatDate(til.createdAt) }}
              </div>
            </div>
          </div>
          
          <div class="prose prose-blue max-w-none">
            <p class="text-gray-700 whitespace-pre-line">{{ til.content }}</p>
          </div>
          
          <div v-if="til.source" class="mt-8 pt-4 border-t border-gray-200">
            <h3 class="text-lg font-medium text-gray-800 mb-2">Source</h3>
            <a 
              :href="til.source" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {{ til.source }}
            </a>
          </div>
        </div>

        <!-- Back Button -->
        <div class="mt-8 flex justify-between">
          <NuxtLink
            to="/til"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to TIL List
          </NuxtLink>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else class="text-center py-12">
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
        <h3 class="text-lg font-semibold mb-2">TIL entry not found</h3>
        <p class="text-gray-500 mb-6">
          The TIL entry you're looking for doesn't exist or has been removed.
        </p>
        <NuxtLink
          to="/til"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to TIL List
        </NuxtLink>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { format, parseISO } from 'date-fns';
import { useTILStore } from '~/stores/til';

const route = useRoute();
const tilStore = useTILStore();

const til = ref(null);
const loading = ref(true);
const error = ref(null);

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

function formatDate(dateString) {
  try {
    return format(parseISO(dateString), 'MMMM d, yyyy');
  } catch (err) {
    console.error('Error formatting date:', err);
    return dateString;
  }
}

async function fetchTIL() {
  loading.value = true;
  error.value = null;

  try {
    const id = route.params.id;
    const fetchedTIL = await tilStore.fetchTILById(id);
    
    if (fetchedTIL) {
      til.value = fetchedTIL;
    } else {
      error.value = 'TIL entry not found';
    }
  } catch (err) {
    error.value = err.message || 'An error occurred while fetching the TIL entry';
    console.error('Error fetching TIL:', err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchTIL();
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  max-width: 65ch;
  color: #374151;
}

.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose a {
  color: #2563eb;
  text-decoration: underline;
  font-weight: 500;
}

.prose strong {
  font-weight: 600;
}
</style>
