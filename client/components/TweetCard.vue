<template>
  <div
    class="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 h-full flex flex-col relative group active:scale-95"
    :class="{ 'animate-pulse-once': isClicked }"
    @click="handleClick"
  >
    <div class="p-5 flex-grow">
      <!-- Tweet Header -->
      <div class="flex items-center mb-4">
        <div class="flex-shrink-0">
          <img
            src="~/public/images/profile.png"
            alt="Ketan Karki"
            class="h-10 w-10 rounded-full ring-2 ring-primary-100 object-cover"
          />
        </div>
        <div class="ml-3">
          <p class="text-sm font-semibold text-gray-900 font-heading">
            Ketan Karki
          </p>
          <p class="text-xs text-gray-500 flex items-center">
            <span>@KetanKarki</span>
            <span
              class="inline-block w-1 h-1 rounded-full bg-gray-300 mx-1.5"
            ></span>
            <time :datetime="tweet.createdAt" class="text-xs text-gray-500">{{
              formattedDate
            }}</time>
          </p>
        </div>
      </div>

      <!-- Tweet Content -->
      <div class="mb-5">
        <p
          class="text-gray-800 whitespace-pre-wrap text-base leading-relaxed font-sans"
        >
          {{ tweet.text }}
        </p>
      </div>

      <!-- Tweet Metrics -->
      <div
        class="flex space-x-8 text-gray-500 text-xs border-t border-gray-100 pt-3"
      >
        <div class="flex items-center group cursor-pointer">
          <div
            class="flex items-center justify-center w-6 h-6 rounded-full group-hover:bg-primary-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5 group-hover:text-primary-500 transition-colors"
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
          </div>
          <span class="group-hover:text-primary-500 transition-colors ml-1">{{
            tweet.publicMetrics?.reply_count || 0
          }}</span>
        </div>
        <div class="flex items-center group cursor-pointer">
          <div
            class="flex items-center justify-center w-6 h-6 rounded-full group-hover:bg-primary-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5 group-hover:text-primary-500 transition-colors"
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
          </div>
          <span class="group-hover:text-primary-500 transition-colors ml-1">{{
            tweet.publicMetrics?.retweet_count || 0
          }}</span>
        </div>
        <div class="flex items-center group cursor-pointer">
          <div
            class="flex items-center justify-center w-6 h-6 rounded-full group-hover:bg-primary-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5 group-hover:text-primary-500 transition-colors"
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
          </div>
          <span class="group-hover:text-primary-500 transition-colors ml-1">{{
            tweet.publicMetrics?.like_count || 0
          }}</span>
        </div>
      </div>
    </div>

    <!-- Link to original tweet -->
    <a
      :href="`https://twitter.com/KetanKarki/status/${tweet.id}`"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center bg-primary-50 text-primary-600 text-center py-3 text-sm font-medium hover:bg-primary-100 transition-colors mt-auto group-hover:bg-primary-100"
    >
      <span>View on Twitter</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 ml-1.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { format, parseISO } from "date-fns";

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["click"]);

// Animation state
const isClicked = ref(false);

const formattedDate = computed(() => {
  if (!props.tweet.createdAt) return "";
  return format(parseISO(props.tweet.createdAt), "MMMM d, yyyy");
});

// Handle click with animation
function handleClick(event) {
  // Prevent triggering click when clicking on the Twitter link
  if (event.target.closest('a[target="_blank"]')) {
    return;
  }

  isClicked.value = true;

  // Reset the animation state after animation completes
  setTimeout(() => {
    isClicked.value = false;
    emit("click", props.tweet);
  }, 300);
}
</script>
