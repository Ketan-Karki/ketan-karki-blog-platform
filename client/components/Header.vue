<!-- filepath: /Users/ketan/Learning/Slow-Down-TIme/slow-down-time-client/components/Header.vue -->
<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <nav class="max-w-6xl mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-primary-600">
          Slow Down Time
        </NuxtLink>
        
        <div class="flex space-x-6">
          <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 transition-colors">
            Home
          </NuxtLink>
          <NuxtLink to="/about" class="text-gray-700 hover:text-primary-600 transition-colors">
            About
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 hover:text-primary-600 transition-colors">
            Contact
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>