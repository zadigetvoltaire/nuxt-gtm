<template>
  <div>
    Nuxt GTM playground!

    <code><pre>{{ $gtm.options }}</pre></code>

    <button data-test="track-event" @click="triggerEvent">
      trackEvent
    </button>

    <button data-test="track-view" @click="triggerView">
      triggerView
    </button>
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
</script>
