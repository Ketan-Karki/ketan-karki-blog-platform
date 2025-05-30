<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <h3 class="text-xl font-semibold">Slow Down Time</h3>
          <p class="text-gray-400 mt-1">A personal blog about development, life, and everything in between.</p>
        </div>
        <div class="flex space-x-6">
          <NuxtLink to="/" class="hover:text-primary-400 transition">Home</NuxtLink>
          <NuxtLink to="/about" class="hover:text-primary-400 transition">About</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-primary-400 transition">Contact</NuxtLink>
        </div>
      </div>
      <div class="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400">
        <p>© {{ new Date().getFullYear() }} Slow Down Time. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
