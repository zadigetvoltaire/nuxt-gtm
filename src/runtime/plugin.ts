
import { defineNuxtPlugin, useRouter } from 'nuxt/app'
import { createGtm, type VueGtmUseOptions } from '@gtm-support/vue-gtm'
// @ts-ignore

export default defineNuxtPlugin((nuxt) => {
  if (process.client) {
    const options = nuxt.$config.public.gtm

    const router = useRouter()

    const pluginOptions: VueGtmUseOptions = {
      ...options,
      vueRouter: options.enableRouterSync && router ? router as VueGtmUseOptions['vueRouter'] : undefined
    }

    nuxt.vueApp.use(createGtm(pluginOptions))
  }
})
