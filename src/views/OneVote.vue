<template>
  <div>
    <div>单个投票显示界面 {{ id }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>