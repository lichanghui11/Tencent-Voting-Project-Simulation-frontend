<template>
  <Suspense>
    <template #fallback>Loadding...</template>
    <App></App>
  </Suspense>
</template>

<script setup lang="ts">
import App from './App.vue'
</script>
