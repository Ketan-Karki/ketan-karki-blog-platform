<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
useHead({
  titleTemplate: "%s - Ketan Karki",
  meta: [
    {
      name: "description",
      content:
        "Ketan Karki's personal blog about development, life, and everything in between.",
    },
    // Default Open Graph meta tags
    { property: "og:site_name", content: "Ketan Karki's Blog" },
    {
      property: "og:image",
      content: "https://ketankarki.wiki/images/default-og-image.png",
    },
    // Default Twitter Card meta tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: "@KetanKarki" },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/images/favicon.ico" },
    { rel: "apple-touch-icon", href: "/images/logo.jpg" },
    { rel: "canonical", href: "https://ketankarki.wiki" },
  ],
});
</script>
