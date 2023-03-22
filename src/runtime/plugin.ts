import { defineNuxtPlugin } from 'nuxt/app'
import { createGtm, type VueGtmUseOptions } from '@gtm-support/vue-gtm'
import type { Router } from 'vue-router'
import type { ModuleOptions } from '../module'
// @ts-ignore
import gtmOptions from '#gtm'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const options = gtmOptions as ModuleOptions

    const pluginOptions: VueGtmUseOptions = {
      ...options,
      vueRouter: options.enableRouterSync && nuxtApp.$router ? nuxtApp.$router as Router : undefined
    }

    console.log('pluginOptions', pluginOptions)

    nuxtApp.vueApp.use(createGtm(pluginOptions))
  }
})
