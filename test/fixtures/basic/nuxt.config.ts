import nuxtGtm from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    // @ts-ignore
    nuxtGtm
  ],
  gtm: {
    devtools: true,
    id: 'GTM-XXXXXX',
    enableRouterSync: true
  }
})
