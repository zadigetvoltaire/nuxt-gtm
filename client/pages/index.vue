<script setup lang="ts">
import { useDevtoolsClient } from '@nuxt/devtools/iframe-client'

const client = useDevtoolsClient()
</script>

<template>
  <div class="relative p-10 n-bg-base flex flex-col h-screen">
    <h1 class="text-3xl font-bold">
      Nuxt GTM
    </h1>

    <div class="opacity-50 mb-4">
      Nuxt DevTools Integration
    </div>

    <div
      v-if="client"
      class="flex flex-col gap-2 h-full"
    >
      <NTip
        n="green"
        icon="carbon-checkmark"
      >
        Nuxt DevTools is connected
      </NTip>

      <div class="w-full bg-green opacity-50 h-0.5 mt-2" />

      <div>
        <NButton
          n="green"
          class="mt-4"
          @click="client?.host.closeDevTools()"
        >
          Close DevTools
        </NButton>
      </div>
    </div>
    <div v-else>
      <NTip n="yellow">
        Failed to connect to the client. Did you open this page inside Nuxt DevTools?
      </NTip>
    </div>

    <div class="flex-auto" />
  </div>
</template>
