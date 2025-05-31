<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
    <div class="p-5 flex-grow">
      <!-- Tweet Header -->
      <div class="flex items-center mb-4">
        <div class="flex-shrink-0">
          <img
            src="~/assets/Octocat Build.png"
            alt="Ketan Karki"
            class="h-11 w-11 rounded-full ring-2 ring-indigo-50"
          />
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">Ketan Karki</p>
          <p class="text-xs text-gray-500">@KetanKarki</p>
        </div>
        <!-- Day number chip removed as requested -->
      </div>

      <!-- Tweet Content -->
      <div class="mb-4">
        <p class="text-gray-800 whitespace-pre-wrap text-base leading-relaxed">{{ tweet.text }}</p>
      </div>

      <!-- Tweet Date -->
      <div class="text-sm text-gray-500 mb-4">
        <time datetime="tweet.createdAt">{{ formattedDate }}</time>
      </div>

      <!-- Tweet Metrics -->
      <div class="flex space-x-6 text-gray-500 text-sm border-t pt-3">
        <div class="flex items-center group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1 group-hover:text-indigo-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span class="group-hover:text-indigo-500 transition-colors">{{ tweet.publicMetrics?.reply_count || 0 }}</span>
        </div>
        <div class="flex items-center group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1 group-hover:text-indigo-500 transition-colors"
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
          <span class="group-hover:text-indigo-500 transition-colors">{{ tweet.publicMetrics?.retweet_count || 0 }}</span>
        </div>
        <div class="flex items-center group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1 group-hover:text-indigo-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span class="group-hover:text-indigo-500 transition-colors">{{ tweet.publicMetrics?.like_count || 0 }}</span>
        </div>
      </div>
    </div>

    <!-- Link to original tweet -->
    <a
      :href="`https://twitter.com/KetanKarki/status/${tweet.id}`"
      target="_blank"
      rel="noopener noreferrer"
      class="block bg-indigo-50 text-indigo-600 text-center py-3 text-sm font-medium hover:bg-indigo-100 transition-colors mt-auto"
    >
      View on Twitter
    </a>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { format, parseISO } from "date-fns";

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() => {
  if (!props.tweet.createdAt) return "";
  return format(parseISO(props.tweet.createdAt), "MMMM d, yyyy");
});
</script>
