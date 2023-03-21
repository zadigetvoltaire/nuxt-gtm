<template>
  <div>
    Nuxt GTM playground!

    <code><pre>{{ $gtm.options }}</pre></code>

    <button @click="triggerEvent">
      trackEvent
    </button>

    <button @click="triggerView">
      triggerView
    </button>

    {{ dataLayer }}
  </div>
</template>

<script lang="ts" setup>
import { useGtm } from '@gtm-support/vue-gtm'

const gtm = useGtm()

function triggerEvent () {
  return gtm?.trackEvent({
    event: 'EventTest',
    label: 'EventLabel'
  })
}

function triggerView () {
  gtm?.trackView('Home', '/')
}

const dataLayer = computed(() => window?.dataLayer)
</script>
