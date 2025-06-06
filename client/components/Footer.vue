<template>
  <footer class="bg-gray-50 border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <!-- Brand Section -->
        <div class="md:col-span-5 space-y-4">
          <div class="flex items-center space-x-2">
            <span
              class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent"
            >
              Ketan Karki
            </span>
          </div>
          <p class="text-gray-500 max-w-md">
            A personal blog site about development, life, and everything in
            between. Join me on this journey of exploration and learning.
          </p>
          <!-- Social Links -->
          <div class="flex space-x-4 pt-2">
            <a
              href="https://x.com/KetanKarki"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-primary-600 transition-colors"
            >
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M13.6 3.25h3.5l-7.6 8.7 9 11.8h-7l-5.5-7.1-6.3 7.1h-3.5l8.1-9.2-8.7-11.3h7.2l4.9 6.5 5.9-6.5zm-1.2 18.5h1.9l-13-18.3h-2l13.1 18.3z"
                  transform="translate(2, 0) scale(0.85)"
                />
              </svg>
            </a>
            <a
              href="https://github.com/Ketan-Karki"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-primary-600 transition-colors"
            >
              <span class="sr-only">GitHub</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/ketan-karki-9a9b071b6/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-primary-600 transition-colors"
            >
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="md:col-span-3 md:ml-auto">
          <h3
            class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4"
          >
            Navigation
          </h3>
          <ul class="space-y-3">
            <li v-for="(item, index) in navItems" :key="index">
              <NuxtLink
                :to="item.path"
                class="text-base text-gray-500 hover:text-primary-600 transition-colors"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter Section -->
        <div class="md:col-span-4">
          <h3
            class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4"
          >
            Stay Updated
          </h3>
          <p class="text-gray-500 mb-4">
            Subscribe to get notified about new posts and updates.
          </p>
          <form class="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              class="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              class="px-4 py-2 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="border-t border-gray-200 py-6">
        <p class="text-sm text-gray-500 text-center">
          © {{ new Date().getFullYear() }} Ketan Karki. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navItems = [
  { name: "Home", path: "/" },
  { name: "Daily Blog", path: "/daily-blog" },
  { name: "TIL", path: "/til" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];
</script>
