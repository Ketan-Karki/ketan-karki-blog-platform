<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
        @click="$emit('close')"
      ></div>

      <!-- Modal content -->
      <div
        class="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white shadow-xl transition-all"
        :class="{ 'animate-fade-in-down': !closing, 'animate-fade-out-up': closing }"
      >
        <!-- Close button -->
        <button
          @click="closeDialog"
          class="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <span class="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
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
        </button>

        <div class="p-6">
          <!-- Day badge -->
          <div class="mb-4 flex items-center justify-between">
            <div class="flex items-center">
              <time
                :datetime="tweet?.createdAt"
                class="ml-3 text-sm text-gray-500"
              >{{ formattedDate }}</time>
            </div>
          </div>

          <!-- Tweet header -->
          <div class="flex items-center mb-6">
            <div class="flex-shrink-0">
              <img
                src="~/public/images/profile.png"
                alt="Ketan Karki"
                class="h-12 w-12 rounded-full ring-2 ring-primary-100 object-cover"
              />
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900 font-heading">
                Ketan Karki
              </h3>
              <p class="text-sm text-gray-500">@KetanKarki</p>
            </div>
          </div>

          <!-- Tweet content -->
          <div class="mb-8">
            <p class="text-gray-800 whitespace-pre-wrap text-lg leading-relaxed font-sans">
              {{ tweet?.text }}
            </p>
          </div>

          <!-- Tweet metrics -->
          <div class="flex space-x-8 text-gray-500 text-sm border-t border-gray-100 pt-4">
            <div class="flex items-center">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-500"
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
              <span class="ml-2">{{ tweet?.publicMetrics?.reply_count || 0 }} replies</span>
            </div>
            <div class="flex items-center">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-500"
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
              <span class="ml-2">{{ tweet?.publicMetrics?.retweet_count || 0 }} retweets</span>
            </div>
            <div class="flex items-center">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-500"
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
              <span class="ml-2">{{ tweet?.publicMetrics?.like_count || 0 }} likes</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-6 flex justify-end">
            <a
              :href="`https://twitter.com/KetanKarki/status/${tweet?.id}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center bg-primary-50 text-primary-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
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
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { format, parseISO } from "date-fns";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  tweet: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close"]);

// Animation state
const closing = ref(false);

// Format the date
const formattedDate = computed(() => {
  if (!props.tweet?.createdAt) return "";
  return format(parseISO(props.tweet.createdAt), "MMM d, yyyy • h:mm a");
});

// Handle closing with animation
const closeDialog = () => {
  closing.value = true;
  setTimeout(() => {
    closing.value = false;
    emit("close");
  }, 300); // Match animation duration
};

// Handle escape key
const handleEscape = (e) => {
  if (e.key === "Escape" && props.show) {
    closeDialog();
  }
};

// Add and remove event listeners
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      document.addEventListener("keydown", handleEscape);
      document.body.classList.add("overflow-hidden");
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("overflow-hidden");
    }
  }
);

// Clean up on component unmount
onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
  document.body.classList.remove("overflow-hidden");
});
</script>
