import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["shadcn-nuxt", "@vueuse/nuxt", "@nuxtjs/color-mode"],
  css: ["@/assets/css/main.css"],
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    componentDir: "./components/ui",
    prefix: "",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
