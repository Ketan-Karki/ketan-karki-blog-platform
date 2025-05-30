<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />
    
    <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
      <div class="bg-white shadow-md rounded-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">About Slow Down Time</h1>
        
        <div class="prose max-w-none">
          <p class="text-lg mb-4">
            Welcome to Slow Down Time, a personal blog where I share my thoughts, experiences, and insights about software development, productivity, and life in general.
          </p>
          
          <h2 class="text-2xl font-semibold mt-8 mb-4">My Journey</h2>
          <p>
            As a software developer with a passion for learning and sharing knowledge, I created this space to document my journey and hopefully provide value to others on similar paths.
          </p>
          
          <h2 class="text-2xl font-semibold mt-8 mb-4">What You'll Find Here</h2>
          <p>
            On this blog, you'll find articles about:
          </p>
          <ul class="list-disc pl-6 mt-2">
            <li>Web development techniques and best practices</li>
            <li>Productivity tips and tools</li>
            <li>Personal reflections on work-life balance</li>
            <li>Book reviews and recommendations</li>
            <li>And much more!</li>
          </ul>
          
          <h2 class="text-2xl font-semibold mt-8 mb-4">Connect With Me</h2>
          <p>
            I love connecting with like-minded individuals. Feel free to reach out through the <NuxtLink to="/contact" class="text-primary-600 hover:text-primary-800">contact page</NuxtLink> or follow me on social media.
          </p>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
useHead({
  title: 'About - Slow Down Time',
  meta: [
    { name: 'description', content: 'Learn more about the Slow Down Time blog and its author.' }
  ]
})
</script>
