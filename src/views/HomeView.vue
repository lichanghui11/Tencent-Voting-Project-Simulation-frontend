<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="">
    <div class="w-full h-[80vh] space-y-4 text-[#bcc1cb]">
      <RouterView />
        <div
          class="flex fixed left-1/2 transform -translate-x-1/2 bottom-0 items-center justify-center w-full pt-1  bg-white"
        >
          <RouterLink
            active-class="active-link"
            class="basis-0 grow flex flex-1 flex-col items-center hover:text-[#3a6bea]"
            to="/vote-type"
          >
            <div><el-icon :size="20"><DocumentAdd /></el-icon></div>
            <div class="">新建</div>
          </RouterLink>
          <RouterLink
            active-class="active-link"
            class="basis-0 grow flex flex-1 flex-col items-center hover:text-[#3a6bea]"
            to="/me"
          >
            <div class="">
           <el-icon :size="20"><UserFilled /></el-icon> 
            </div>
            <div class="">我的</div>
          </RouterLink>
        </div>
    </div>
  </div>
</template>

<style scoped>
.active-link {
  color: #3a6bea;
}
</style>
