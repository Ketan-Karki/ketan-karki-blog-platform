<!-- filepath: /Users/ketan/Learning/Slow-Down-TIme/slow-down-time-client/pages/index.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />
    
    <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Slow Down Time
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          A personal blog about development, life, and everything in between.
        </p>
      </div>

      <div v-if="blogStore.loading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      </div>

      <div v-else-if="blogStore.error" class="text-center text-red-600">
        {{ blogStore.error }}
      </div>

      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard 
          v-for="post in blogStore.posts" 
          :key="post.id" 
          :post="post" 
        />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
const blogStore = useBlogStore()

onMounted(() => {
  blogStore.fetchPosts()
})

useHead({
  title: 'Slow Down Time - Personal Blog',
  meta: [
    { name: 'description', content: 'A personal blog about development, life, and everything in between.' }
  ]
})
</script>