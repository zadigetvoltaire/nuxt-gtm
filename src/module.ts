import { type VueGtmUseOptions } from '@gtm-support/vue-gtm'
import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import { defu } from 'defu'
import { setupDevToolsUI } from './devtools'

// Module options TypeScript interface definition
export interface ModuleOptions extends Omit<VueGtmUseOptions, 'vueRouter'> {
  enableRouterSync?: boolean
  /**
   * Enable Nuxt Devtools integration
   *
   * @default true
   */
  devtools?: boolean
}

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    gtm: ModuleOptions
  }
  interface NuxtConfig {
    gtm?: ModuleOptions
  }
  interface NuxtOptions {
    gtm?: ModuleOptions
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@zadigetvoltaire/nuxt-gtm',
    configKey: 'gtm',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  // @ts-ignore
  defaults: {
    devtools: true
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const moduleOptions: ModuleOptions = defu(nuxt.options.runtimeConfig.public.gtm, options)

    nuxt.options.runtimeConfig.public.gtm = moduleOptions

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    addImports({
      name: 'useGtm',
      as: 'useGtm',
      from: '@gtm-support/vue-gtm'
    })

    if (options.devtools) {
      setupDevToolsUI(nuxt, resolver)
    }
  }
})
