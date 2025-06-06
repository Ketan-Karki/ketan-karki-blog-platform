<template>
  <div class="flex flex-col min-h-screen bg-white">
    <Header />

    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-gray-50 to-white border-b border-gray-100"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28"
      >
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Hero Content -->
          <div class="space-y-6 md:pr-8">
            <span
              class="inline-block px-3 py-1 text-sm font-medium bg-primary-50 text-primary-700 rounded-full"
            >
              Personal Blog
            </span>
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
            >
              <span
                class="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent"
              >
                Exploring
              </span>
              Ideas &amp; Insights
            </h1>
            <p class="text-xl text-gray-600 leading-relaxed">
              A personal blog site about development, life, and everything in
              between. Join me on this journey of exploration and learning.
            </p>
            <div class="flex flex-wrap gap-4 pt-4 mt-2">
              <NuxtLink
                to="/daily-blog"
                class="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-base"
              >
                Daily Blog
              </NuxtLink>
              <NuxtLink
                to="/about"
                class="px-6 py-3 bg-white text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-base"
              >
                About Me
              </NuxtLink>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="relative hidden md:block">
            <div
              class="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-primary-300/10 rounded-2xl transform rotate-3"
            ></div>
            <img
              src="/images/hero-image.jpg"
              alt="Blog Hero"
              class="relative z-10 rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Posts -->
    <main class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900">Latest Articles</h2>
        </div>

        <!-- Loading State -->
        <div v-if="blogStore.loading" class="flex justify-center py-12">
          <div
            class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"
          ></div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="blogStore.error"
          class="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-xl text-center"
        >
          <svg
            class="w-12 h-12 mx-auto text-red-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 class="text-lg font-semibold mb-2">Unable to load posts</h3>
          <p>{{ blogStore.error }}</p>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="blogStore.posts.length === 0"
          class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-8 rounded-xl text-center"
        >
          <svg
            class="w-12 h-12 mx-auto text-yellow-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 class="text-lg font-semibold mb-2">No posts found</h3>
          <p>
            API might be returning an empty array or not configured correctly.
          </p>
        </div>

        <!-- Posts Grid -->
        <div v-else>
          <!-- Featured Post (First Post) -->
          <div v-if="blogStore.posts.length > 0" class="mb-12">
            <BlogCard :post="blogStore.posts[0]" />
          </div>

          <!-- Regular Posts Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <BlogCard
              v-for="post in blogStore.posts.slice(1)"
              :key="post.id"
              :post="post"
            />
          </div>
        </div>
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
  title: "Ketan's Blog - Personal Blog",
  meta: [
    {
      name: "description",
      content:
        "A personal blog site about development, life, and everything in between.",
    },
    // Open Graph meta tags
    {
      property: "og:title",
      content: "Ketan's Blog - Personal Blog",
    },
    {
      property: "og:description",
      content:
        "A personal blog site about development, life, and everything in between.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://ketankarki.wiki/",
    },
    {
      property: "og:image",
      content: "https://ketankarki.wiki/images/default-og-image.png",
    },
    // Twitter Card meta tags
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Ketan's Blog - Personal Blog",
    },
    {
      name: "twitter:description",
      content:
        "A personal blog site about development, life, and everything in between.",
    },
    {
      name: "twitter:image",
      content: "https://ketankarki.wiki/images/default-og-image.png",
    },
  ],
});
</script>
