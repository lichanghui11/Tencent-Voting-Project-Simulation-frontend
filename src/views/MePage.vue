<template>
  <div class="text-black">
    <div class="h-[20vh] flex items-center justify-between pl-[40px]">
      <span class="grow-1 text-center rounded-full"
        ><img :src="avatar" alt="头像" class="rounded-full"
      /></span>

      <div class="grow-10">{{ currentUser?.accountName ?? '未登录🍉' }}</div>
    </div>


    <div class="flex flex-col bg-white ">
      <RouterLink
        to="/my-votes"
        class="h-[60px] pl-4 hover:text-[#3a6bea] border-b-[1px] border-[#f2f4f7] leading-[60px]"
      >
        我的投票
        <span class="absolute right-[40px]"><el-icon><ArrowRightBold /></el-icon></span>
      </RouterLink>
      <RouterLink to="/my-settings" class=" h-[60px] pl-4 hover:text-[#3a6bea] border-b-[1px] border-[#f2f4f7] leading-[60px]">
        个人设置
        <span class="absolute right-[40px]"><el-icon><ArrowRightBold /></el-icon></span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLogin } from '../hooks.ts'
import { useVoteStore } from '@/stores/vote.ts';

useLogin()
//https://dummyimage.com/50x50/3a6bea/bccecb
const voteStore = useVoteStore()
const currentUser = voteStore.user

const avatar = ref('')
const avatarPath = currentUser?.avatarUrl 
avatar.value = avatarPath ? ('http://192.168.3.11:3000/api' + avatarPath) : 'https://dummyimage.com/50x50/3a6bea/bccecb'
</script>

