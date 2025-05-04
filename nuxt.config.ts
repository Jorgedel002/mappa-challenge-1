// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  typescript: {
    strict: true
  },

  compatibilityDate: '2025-04-22'
})