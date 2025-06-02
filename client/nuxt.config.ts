// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  nitro: {
    prerender: {
      failOnError: false,
    },
    compatibilityDate: "2025-05-30",
  },
  devtools: { enabled: true },
  modules: [
    [
      "@nuxtjs/tailwindcss",
      {
        configPath: "tailwind.config.js",
      },
    ],
    "@pinia/nuxt",
    "@vueuse/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: [400, 500, 600, 700],
          "Fira Code": [400, 500],
        },
      },
    ],
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NODE_ENV === "production"
          ? "https://ketankarki.wiki"
          : "http://localhost:3001",
    },
  },
});
