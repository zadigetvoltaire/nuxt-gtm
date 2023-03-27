<script setup lang="ts">
import { useDevtoolsClient } from '@nuxt/devtools/iframe-client'

const client = useDevtoolsClient()

const nuxtConfig = await client.value?.devtools.rpc.getServerConfig()
const moduleOptions = nuxtConfig?.gtm
</script>

<template>
  <div class="relative p-5 n-bg-base flex flex-col">
    <h1 class="text-3xl font-bold">
      Nuxt GTM
    </h1>

    <span class="opacity-50">
      By Zadig&voltaire ©
    </span>

    <div class="w-full bg-green opacity-50 h-0.5 my-2" />

    <ModuleAuthorNote />

    <div
      v-if="client"
      class="flex flex-col gap-2 h-full"
    >
      <OptionTable v-if="moduleOptions" :options="moduleOptions" class="my-2" />

      <div>
        <NButton
          n="green"
          class="mt-2"
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
