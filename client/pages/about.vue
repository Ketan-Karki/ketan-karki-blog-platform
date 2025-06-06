<template>
  <div class="flex flex-col min-h-screen bg-white">
    <Header />

    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 py-16 md:py-24"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Hero Content -->
          <div class="space-y-6">
            <h1
              class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
            >
              Hi, I'm
              <span
                class="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent"
              >
                Ketan
              </span>
            </h1>
            <p class="text-xl text-gray-600 leading-relaxed">
              Developer, Football Fan, Coffee Enthusiast
            </p>
            <div class="flex space-x-4 pt-2">
              <a
                href="https://x.com/KetanKarki"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-primary-600 transition-colors"
                aria-label="Twitter"
              >
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
                aria-label="GitHub"
              >
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
                aria-label="LinkedIn"
              >
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- Profile Image -->
          <div class="relative hidden md:block">
            <div
              class="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-primary-300/10 rounded-full transform rotate-3"
            ></div>
            <img
              src="/images/profile.png"
              alt="Ketan Karki"
              class="relative z-10 rounded-full shadow-xl w-80 h-80 object-cover mx-auto"
            />
          </div>
        </div>
      </div>
    </section>

    <main class="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
      <div class="bg-white shadow-md rounded-lg p-8 md:p-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
        <div class="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p class="text-xl leading-relaxed">
            I'm Ketan. When I'm not staring at IDE, I'm probably yelling at the
            screen during a football match or experimenting with a new coffee
            brewing method.
          </p>
          <p>
            Started coding in school and got hooked on building stuff on the
            web.
          </p>
          <p>
            There's something addictive about the whole process – writing code,
            debugging, and then finally seeing everything click into place. Kind
            of like how football and coffee work too – lots of waiting,
            occasional frustration, but those moments when it all comes together
            make it worth it.
          </p>
          <p>
            This blog is where I dump my thoughts on tech and share things I've
            learned the hard way.
          </p>

          <h2 class="text-2xl font-semibold mt-8 mb-4">Connect With Me</h2>
          <p>
            If you're into tech, football, or coffee – or just want to chat –
            feel free to reach out through the
            <NuxtLink
              to="/contact"
              class="text-primary-600 hover:text-primary-800"
              >contact page</NuxtLink
            >
            or follow me on social media.
          </p>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
useHead({
  title: "About - Ketan Karki",
  meta: [
    {
      name: "description",
      content:
        "Developer, Football Fan, Coffee Enthusiast. Learn more about Ketan and his tech journey.",
    },
    // Open Graph meta tags
    {
      property: "og:title",
      content: "About - Ketan Karki",
    },
    {
      property: "og:description",
      content:
        "Developer, Football Fan, Coffee Enthusiast. Learn more about Ketan and his tech journey.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://ketankarki.wiki/about",
    },
    {
      property: "og:image",
      content: "https://ketankarki.wiki/images/profile.png",
    },
    // Twitter card meta tags
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "About - Ketan Karki",
    },
    {
      name: "twitter:description",
      content:
        "Developer, Football Fan, Coffee Enthusiast. Learn more about Ketan and his tech journey.",
    },
    {
      name: "twitter:image",
      content: "https://ketankarki.wiki/images/profile.png",
    },
  ],
});
</script>
