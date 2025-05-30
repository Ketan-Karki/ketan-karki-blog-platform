<!-- filepath: /Users/ketan/Learning/Slow-Down-TIme/slow-down-time-client/pages/index.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />

    <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Slow Down Time</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          A personal blog about development, life, and everything in between.
        </p>
      </div>

      <div v-if="blogStore.loading" class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"
        ></div>
      </div>

      <div v-else-if="blogStore.error" class="text-center text-red-600">
        {{ blogStore.error }}
      </div>

      <!-- Add debugging info -->
      <div
        v-else-if="blogStore.posts.length === 0"
        class="text-center p-4 bg-yellow-100 rounded"
      >
        No posts found. API might be returning an empty array or not configured
        correctly.
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Add debugging info -->
        <div class="col-span-full mb-4 p-2 bg-blue-50 rounded text-sm">
          Found {{ blogStore.posts.length }} posts
        </div>

        <BlogCard v-for="post in blogStore.posts" :key="post.id" :post="post" />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useBlogStore } from "~/stores/blog";

const blogStore = useBlogStore();

onMounted(async () => {
  console.log("Component mounted, fetching posts...");
  await blogStore.fetchPosts();
  console.log("Posts after fetch:", blogStore.posts.length);
});

useHead({
  title: "Slow Down Time - Personal Blog",
  meta: [
    {
      name: "description",
      content:
        "A personal blog about development, life, and everything in between.",
    },
  ],
});
</script>
