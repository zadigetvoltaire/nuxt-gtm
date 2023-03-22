import { defineNuxtPlugin } from 'nuxt/app'
import { createGtm, type VueGtmUseOptions } from '@gtm-support/vue-gtm'
import type { ModuleOptions } from '../module'
// @ts-ignore
import gtmOptions from '#gtm'

export default defineNuxtPlugin(({ vueApp }) => {
  if (process.client) {
    const options = gtmOptions as ModuleOptions

    const vueRouter = vueApp.$nuxt?.$router

    const pluginOptions: VueGtmUseOptions = {
      ...options,
      vueRouter: options.enableRouterSync && vueRouter ? vueRouter : undefined
    }

    vueApp.use(createGtm(pluginOptions))
  }
})
