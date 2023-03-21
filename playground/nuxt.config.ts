export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/devtools'
  ],
  gtm: {
    id: 'GTM-XXXXXX',
    enableRouterSync: true
  }
})
