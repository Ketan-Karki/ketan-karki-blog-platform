<!-- filepath: /Users/ketan/Learning/Slow-Down-TIme/slow-down-time-client/components/BlogCard.vue -->
<template>
  <article class="card p-6 hover:shadow-lg transition-shadow">
    <div class="mb-4">
      <span class="inline-block bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full">
        {{ post.category?.name || 'Uncategorized' }}
      </span>
    </div>
    
    <h2 class="text-xl font-semibold text-gray-900 mb-3">
      <NuxtLink :to="`/blog/${post.slug}`" class="hover:text-primary-600 transition-colors">
        {{ post.title }}
      </NuxtLink>
    </h2>
    
    <p class="text-gray-600 mb-4 line-clamp-3">
      {{ post.excerpt }}
    </p>
    
    <div class="flex justify-between items-center text-sm text-gray-500">
      <time :datetime="post.publishedAt">
        {{ formatDate(post.publishedAt) }}
      </time>
      <span>{{ post.readTime }} min read</span>
    </div>
  </article>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>