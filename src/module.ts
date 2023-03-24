import { type VueGtmUseOptions } from '@gtm-support/vue-gtm'
import { defineNuxtModule, addPlugin, createResolver, addTemplate, addImports } from '@nuxt/kit'
import { setupDevToolsUI } from './devtools'

// Module options TypeScript interface definition
export interface ModuleOptions extends Omit<VueGtmUseOptions, 'vueRouter'> {
  enableRouterSync?: boolean
  /**
   * Enable Nuxt Devtools integration
   *
   * @default true
   */
  devtools: boolean
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

    nuxt.options.alias['#gtm'] = addTemplate({
      filename: 'gtm.mjs',
      write: true,
      getContents: () => `export default ${JSON.stringify(options, undefined, 2)}`
    }).dst || ''

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    addImports({
      name: 'useGtm',
      as: 'useGtm',
      from: resolver.resolve('./runtime/composable')
    })

    if (options.devtools) {
      setupDevToolsUI(nuxt, resolver)
    }
  }
})
