<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useVoteStore } from '@/stores/vote';
const userInfo = useVoteStore()
await userInfo.getUserInfo()
</script>

<template>
  <RouterView />
</template>
