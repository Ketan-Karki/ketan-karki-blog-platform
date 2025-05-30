<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />
    
    <main class="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
      <div v-if="blogStore.loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      </div>

      <div v-else-if="blogStore.error" class="text-center text-red-600 py-12">
        {{ blogStore.error }}
      </div>

      <div v-else-if="post" class="bg-white shadow-sm rounded-lg p-6 md:p-8">
        <div class="mb-6">
          <span class="inline-block bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full mb-4">
            {{ post.category?.name || 'Uncategorized' }}
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ post.title }}</h1>
          
          <div class="flex items-center text-sm text-gray-500 mb-6">
            <time :datetime="post.publishedAt" class="mr-4">
              {{ formatDate(post.publishedAt) }}
            </time>
            <span>{{ post.readTime }} min read</span>
          </div>
        </div>

        <div class="prose prose-lg max-w-none">
          <div v-html="renderedContent"></div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
        <p class="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <NuxtLink to="/" class="btn-primary">Return to Home</NuxtLink>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { marked } from 'marked';

const route = useRoute();
const blogStore = useBlogStore();

// Get the slug from the route
const { slug } = route.params;

// Fetch the specific post if not already loaded
onMounted(async () => {
  if (!blogStore.posts.length) {
    await blogStore.fetchPosts();
  }
});

// Find the post with the matching slug
const post = computed(() => {
  return blogStore.posts.find(p => p.slug === slug);
});

// Render markdown content
const renderedContent = computed(() => {
  if (!post.value?.content) return '';
  return marked(post.value.content);
});

// Format date for display
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Set page metadata
useHead(() => ({
  title: post.value ? `${post.value.title} - Slow Down Time` : 'Post Not Found - Slow Down Time',
  meta: [
    {
      name: 'description',
      content: post.value?.excerpt || 'Blog post not found'
    }
  ]
}));
</script>
