<template>
  <NuxtLink
    :to="`/blog/${post.slug}`"
    class="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex items-center mb-3">
        <span
          class="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded"
        >
          {{ post.category?.name || "Uncategorized" }}
        </span>
        <span class="text-gray-500 text-xs ml-2">
          {{ formatDate(post.publishedAt) }}
        </span>
      </div>

      <h2 class="text-xl font-bold text-gray-900 mb-2">{{ post.title }}</h2>

      <p class="text-gray-600 mb-4 flex-grow line-clamp-3">
        {{ post.excerpt }}
      </p>

      <div class="flex items-center justify-between text-sm text-gray-500">
        <span>{{ post.readTime }} min read</span>
        <span class="font-medium text-primary-600">Read more →</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

// Format the date in a nice human-readable format
const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
