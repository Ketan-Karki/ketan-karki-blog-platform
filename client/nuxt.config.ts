// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
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
