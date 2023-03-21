<template>
  <div>
    <h1>
      Nuxt GTM playground!
    </h1>

    <h2>
      Options
    </h2>

    <code><pre>{{ $gtm.options }}</pre></code>

    <h2>
      Actions
    </h2>

    <button @click="triggerEvent">
      trackEvent
    </button>

    <button @click="triggerView">
      triggerView
    </button>

    <h2>
      Datalayer
    </h2>

    {{ dataLayerPayload }}
  </div>
</template>

<script lang="ts" setup>
import { type DataLayerObject, useGtm } from '@gtm-support/vue-gtm'
import { ref, onMounted } from 'vue'

const gtm = useGtm()

const dataLayerPayload = ref<DataLayerObject[] | boolean>()

onMounted(() => {
  dataLayerPayload.value = window?.dataLayer
})

function triggerEvent () {
  gtm?.trackEvent({
    event: 'EventTest',
    label: 'EventLabel'
  })

  dataLayerPayload.value = gtm?.dataLayer()
}

function triggerView () {
  gtm?.trackView('Home', '/')

  dataLayerPayload.value = gtm?.dataLayer()
}

</script>
