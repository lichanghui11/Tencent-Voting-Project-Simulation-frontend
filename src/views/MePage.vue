<template>
  <div class="text-black">
    <div class="h-[20vh] flex items-center justify-between pl-[40px]">
      <span class="grow-1 text-center rounded-full"
        ><img src="https://dummyimage.com/50x50/3a6bea/bccecb" alt="头像" class="rounded-full"
      /></span>

      <div class="grow-10">西瓜🍉</div>
    </div>


    <div class="flex flex-col bg-white ">
      <RouterLink
        to="/my-votes"
        class="h-[50px] pl-4 hover:text-[#00bd73] border-b-[1px] border-[#f2f4f7] leading-[50px]"
      >
        我的投票
        <span class="absolute right-[40px]"><el-icon><ArrowRightBold /></el-icon></span>
      </RouterLink>
      <RouterLink to="/my-settings" class=" h-[50px] pl-4 hover:text-[#00bd73] border-b-[1px] border-[#f2f4f7] leading-[50px]">
        个人设置
        <span class="absolute right-[40px]"><el-icon><ArrowRightBold /></el-icon></span>
      </RouterLink>
      <RouterLink to="" class="h-[50px] pl-4  hover:text-[#00bd73] border-b-[1px] border-[#f2f4f7] leading-[50px]">
        反馈建议
        <span class="absolute right-[40px]"><el-icon><ArrowRightBold /></el-icon></span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from '../hooks.ts'

useLogin()
</script>