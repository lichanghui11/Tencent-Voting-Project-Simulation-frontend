<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="" >
    <div class="w-full h-[80vh] space-y-4">
      <RouterView />
      <div
        class="flex absolute left-1/2 transform -translate-x-1/2 bottom-0 items-center justify-center w-full"
      >
        <RouterLink
          active-class="active-link"
          class="basis-0 grow flex flex-1 flex-col items-center"
          to="/vote-type"
        >
          <div>📁</div>
          <div class="hover:text-[#00bd73]">新建</div>
        </RouterLink>
        <RouterLink
          active-class="active-link"
          class="basis-0 grow flex flex-1 flex-col items-center"
          to="/me"
        >
          <div>👤</div>
          <div class="hover:text-[#00bd73]">我的</div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-link {
  color: #00bd7e;
}
</style>
