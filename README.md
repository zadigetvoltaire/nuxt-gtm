<div align="center">
	<br>
	<a href="https://zadig-et-voltaire.com/">
		<img src="assets/zadigetvoltaire-logo.svg" width="400" height="100" alt="Click to see the source">
	</a>
	<br>
</div>

# Nuxt GTM

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

> Nuxt Google Tag Manager module integrated with the [Nuxt Devtools](https://github.com/nuxt/devtools) for Nuxt 3.
>
> This library is an Nuxt 3 module wrapper of the [@gtm-support/vue-gtm](https://github.com/gtm-support/vue-gtm) plugin

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Quick Setup

1. Add `@zadigetvoltaire/nuxt-gtm` dependency to your project

```bash
# Using pnpm
pnpm add -D @zadigetvoltaire/nuxt-gtm

# Using yarn
yarn add --dev @zadigetvoltaire/nuxt-gtm

# Using npm
npm install --save-dev @zadigetvoltaire/nuxt-gtm
```

2. Add `@zadigetvoltaire/nuxt-gtm` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@zadigetvoltaire/nuxt-gtm'
  ],
  gtm: {
    id: 'GTM-xxxxxx', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
    queryParams: {
      // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
      gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
      gtm_preview: 'env-4',
      gtm_cookies_win: 'x',
    },
    defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
    compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
    nonce: '2726c7f26c', // Will add `nonce` to the script tag
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: true, // Whether or not display console logs debugs (optional)
    loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
    enableRouterSync: true, // Pass the router instance of your app to automatically sync with router (optional)
    ignoredViews: ['homepage'], // Don't trigger events for specified router names (optional)
    trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
    devtools: true, // (optional)
  }
})
```

## Documentation

Please refer to the [@gtm-support/vue-gtm documentation](https://github.com/gtm-support/vue-gtm#documentation)

## Composition API - useGtm composable

Example:

```vue
<template>
  <button @click="triggerEvent">
    Trigger event!
  </button>
  <button @click="triggerView">
    Trigger event!
  </button>
</template>

<script lang="ts" setup>
  const gtm = useGtm() // auto-imported by the module

  function triggerEvent() {
    gtm.trackEvent({
      event: 'event name',
      category: 'category',
      action: 'click',
      label: 'My custom component trigger',
      value: 5000,
      noninteraction: false,
    })
  }

  function triggerView() {
    gtm.trackView('Home', '/')
  }
</script>
```

## Options API

```ts
export default {
  methods: {
    triggerEvent() {
      this.$gtm.trackEvent({
        event: 'event name',
        category: 'category',
        action: 'click',
        label: 'My custom component trigger',
        value: 5000,
        noninteraction: false,
      })
    }
  }
}
```

## Modules options

The modules inherit the options of the plugin [@gtm-support/vue-gtm](https://github.com/gtm-support/vue-gtm#configuration), except `vueRouter` entry replaced by `enableRouterSync`.

```ts
type ModuleOptions = {
  // SPECIFIC MODULES OPTIONS
  enableRouterSync?: boolean
  /**
   * Enable Nuxt Devtools integration
   *
   * @default true
   */
  devtools: boolean

  // PLUGIN AND MODULE OPTIONS

  /**
   * Derive additional event data after navigation.
   */
  vueRouterAdditionalEventData?: (to: RouteLocationNormalized, from: RouteLocationNormalized) => Record<string, any> | Promise<Record<string, any>>;
  /**
   * Don't trigger events for specified router names.
   */
  ignoredViews?: string[] | ((to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean);
  /**
   * Whether or not call `trackView` in `Vue.nextTick`.
   */
  trackOnNextTick?: boolean;
  /**
   * Your GTM single container ID, array of container ids or array of objects.
   *
   * @example
   *     'GTM-xxxxxx'
   *     // or
   *     ['GTM-xxxxxx', 'GTM-yyyyyy']
   *     // or
   *     [{
   *       id: 'GTM-xxxxxx',
   *       queryParams: {
   *         gtm_auth: 'abc123',
   *         gtm_preview: 'env-4',
   *         gtm_cookies_win: 'x'
   *       }
   *     }, {
   *       id: 'GTM-yyyyyy',
   *       queryParams: {
   *         gtm_auth: 'abc234',
   *         gtm_preview: 'env-5',
   *         gtm_cookies_win: 'x'
   *       }
   *     }]
   */
  id: string | string[] | GtmIdContainer[];
  /**
   * Add url query string when load gtm.js with GTM ID.
   */
  queryParams?: GtmQueryParams;
  /**
   * Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible).
   *
   * Defaults to false, so the script is loaded `async` by default.
   *
   * @default false
   */
  defer?: boolean;
  /**
   * Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`.
   *
   * @default false
   */
  compatibility?: boolean;
  /**
   * Will add `nonce` to the script tag.
   *
   * @see [Using Google Tag Manager with a Content Security Policy](https://developers.google.com/tag-manager/web/csp)
   */
  nonce?: string;
  /**
   * The URL of the script; useful for server-side GTM.
   *
   * @default https://www.googletagmanager.com/gtm.js
   */
  source?: string;
  /**
   * Plugin can be disabled by setting this to `false`.
   *
   * @example enabled: !!GDPR_Cookie
   * @default true
   */
  enabled?: boolean;
  /**
   * Whether or not to display console logs debugs.
   */
  debug?: boolean;
  /**
   * Whether or not to load the GTM Script.
   *
   * Helpful if you are including GTM manually, but need the dataLayer functionality in your components.
   */
  loadScript?: boolean;
  /**
   * The property of Track view event.
   *
   * @example trackViewEventProperty: 'track-view-event-demo'
   * @default content-view
   */
  trackViewEventProperty?: string;
}
```

---

That's it! You can now use Nuxt GTM in your Nuxt app ✨

## Contributing

```bash
# Install dependencies, prepare apps & run dev server
make start

# Run dev server
pnpm dev

# Develop with playground, with bundled client ui
pnpm play:prod

# Run ESLint
pnpm lint

# Run Vitest
pnpm test
pnpm test:watch
```

## Release new version

1. Execute release command

⚠ This command should be executed only on the main branch

This command will:

- Generate the CHANGELOG.md and push it with a release commit
- Bump the package version
- Create and push the new tag
- Create a github release to trigger the library publish pipeline

```bash
pnpm release
```

---

Powered by Zadig&Voltaire ©

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@zadigetvoltaire/nuxt-gtm/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@zadigetvoltaire/nuxt-gtm

[npm-downloads-src]: https://img.shields.io/npm/dm/@zadigetvoltaire/nuxt-gtm.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@zadigetvoltaire/nuxt-gtm

[license-src]: https://img.shields.io/npm/l/@zadigetvoltaire/nuxt-gtm.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@zadigetvoltaire/nuxt-gtm

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
