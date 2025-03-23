<template>
 <div class="bg-[#f2f4f7]">
    <div class="relative text-center px-4 py-4 flex justify-between transform">
      <RouterLink to="/me" class="flex items-center justify-center">
        <span class="flex leading-4">
          <el-icon class="mr-2"><ArrowLeftBold /></el-icon>
        </span>
        <span class="absolute left-1/2 translate-x-[-50%] font-bold ">昵称设置</span>
      </RouterLink>
    </div>

     <div class="mt-6 bg-white h-[50px] px-4 leading-[50px] flex justify-between">
      <input type="text" value="西瓜🍉" class="w-full">
    </div>
  
  <div class="text-center bg-[#f2f4f7] pb-[20px]">
      <button
        class="hover:text-[#00bd7e] px-10 py-2 bg-[#3a6bea] text-white font-bold rounded mt-[50px] w-7/8 mx-auto">
        保存
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from '../hooks.ts'

useLogin()
</script>