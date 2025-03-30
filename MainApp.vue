<template>
  <Suspense>
    <template #fallback>Loading...</template>
    <App></App>
  </Suspense>
</template>

<script setup lang="ts">
import App from './App.vue'
</script>
