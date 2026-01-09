import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "AoR - Stargate Network Dashboard",
    },
  },
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
  ],
  css: ["@/assets/css/main.css"],
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    componentDir: "./app/components/ui",
    prefix: "",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});