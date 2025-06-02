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
          <div v-if="post?.content" v-html="renderedContent"></div>
          <p v-else class="text-gray-500">No content available</p>
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
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import moment from 'moment';

const route = useRoute();
const blogStore = useBlogStore();

const { slug } = route.params;

onMounted(async () => {
  if (!blogStore.posts.length) {
    await blogStore.fetchPosts();
  }
});

const post = computed(() => {
  return blogStore.posts.find(p => p.slug === slug);
});
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
}).use(highlightjs, { inline: true });

const renderedContent = computed(() => {
  if (!post.value?.content) return '';
  try {
    return md.render(post.value.content);
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return `<p class="text-red-500">Error parsing markdown: ${error.message}</p>`;
  }
});

const formatDate = (date) => {
  return moment(date).format('D MMMM, YYYY');
};
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
