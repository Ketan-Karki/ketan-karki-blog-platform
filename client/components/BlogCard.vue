<template>
  <NuxtLink
    :to="`/blog/${post.slug}`"
    class="group flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 hover:border-gray-200 relative"
  >
    <!-- Featured Image (if available) -->
    <div v-if="post.featuredImage" class="aspect-[16/9] w-full overflow-hidden">
      <img 
        :src="post.featuredImage" 
        :alt="post.title" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <!-- Content Section -->
    <div class="p-6 sm:p-8 flex flex-col flex-grow">
      <!-- Category & Date -->
      <div class="flex items-center justify-between mb-4">
        <span
          class="bg-primary-50 text-primary-700 text-xs font-medium px-3 py-1 rounded-full"
        >
          {{ post.category?.name || "Uncategorized" }}
        </span>
        <time 
          :datetime="post.publishedAt" 
          class="text-gray-500 text-sm font-medium"
        >
          {{ formatDate(post.publishedAt) }}
        </time>
      </div>

      <!-- Title -->
      <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
        {{ post.title }}
      </h2>

      <!-- Excerpt -->
      <p class="text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
        {{ post.excerpt }}
      </p>

      <!-- Footer: Read Time & Read More -->
      <div class="flex items-center justify-between text-sm mt-auto pt-4 border-t border-gray-100">
        <div class="flex items-center text-gray-500">
          <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ post.readTime }} min read</span>
        </div>
        <span class="font-medium text-primary-600 group-hover:text-primary-700 transition-colors flex items-center">
          Read more
          <svg class="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
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
