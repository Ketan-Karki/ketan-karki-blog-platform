<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex justify-between items-center h-16 md:h-20">
        <!-- Logo -->  
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <span class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary-500 group-hover:to-primary-600">
            Ketan Karki
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->  
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink 
            v-for="(item, index) in navItems" 
            :key="index" 
            :to="item.path"
            class="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 rounded-md hover:bg-gray-50"
            :class="{ 'text-primary-600': $route.path === item.path }"
          >
            {{ item.name }}
            <span 
              v-if="$route.path === item.path" 
              class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform origin-left transition-transform duration-200"
            ></span>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->  
        <button 
          @click="isMenuOpen = !isMenuOpen" 
          class="md:hidden flex items-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 focus:outline-none"
        >
          <span class="sr-only">Open menu</span>
          <svg v-if="!isMenuOpen" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>
    </div>

    <!-- Mobile Navigation Menu -->  
    <div 
      v-if="isMenuOpen" 
      class="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-100 shadow-lg transition-all duration-200 ease-in-out z-50"
    >
      <div class="px-4 py-3 space-y-1">
        <NuxtLink 
          v-for="(item, index) in navItems" 
          :key="index" 
          :to="item.path"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
          :class="{ 'text-primary-600 bg-gray-50': $route.path === item.path }"
          @click="isMenuOpen = false"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
const route = useRoute();

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Daily Blog', path: '/daily-blog' },
  { name: 'TIL', path: '/til' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];
</script>