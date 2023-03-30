export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/devtools'
  ],
  gtm: {
    id: 'GTM-XXXXXX',
    enableRouterSync: true,
    queryParams: {
      gtm_auth: 'init',
      gtm_cookies_win: 'init',
      gtm_preview: 'init'
    }
  },
  runtimeConfig: {
    public: {
      gtm: {
        id: 'GTM-YYYYYY',
        queryParams: {
          gtm_auth: 'test',
          gtm_cookies_win: 'test',
          gtm_preview: 'test'
        }
      }
    }
  }
})
