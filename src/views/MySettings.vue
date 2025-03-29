<template>
  <div class="bg-[#f2f4f7]">
    <div class="relative text-center px-4 ">
     <NavBar
          :title="`个人设置`"
          left-arrow
          @click-left="onClickLeft"
          class="!bg-[#f2f4f7]"
        />
      <!-- <RouterLink to="/me" class="flex items-center justify-center">
        <span class="flex leading-4">
          <el-icon class="mr-2"><ArrowLeftBold /></el-icon>
        </span>
        <span class="absolute left-1/2 translate-x-[-50%] font-bold ">个人设置</span>
      </RouterLink> -->
    </div>
    
    <div class="flex justify-center h-[20vh] mt-4">
      <span class="rounded-full">
        <img :src="avatar" alt="头像" class="rounded-full w-[100px]"/>
      </span>
    </div>

    <RouterLink to="/set-name" class="bg-white h-[50px] px-4 leading-[50px] flex justify-between">
      <span>昵称</span>
      <span class="flex items-center text-[#bcc1cb]">
        <span>{{currentUser?.accountName || '未登录'}}</span>
        <span class="flex items-center"><el-icon class="mr-2"><ArrowRightBold /></el-icon></span>
      </span>
    </RouterLink>
  
    <div class="text-center bg-[#f2f4f7] pb-[20px]">
      <button
        class="px-10 py-2 !text-[#3a6bea] bg-white border font-bold rounded border-[#3a6bea] mt-[150px] w-7/8 mx-auto" @click="logout">
       退出登录 
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores/vote';
import axios from 'axios';
import { useRouter } from 'vue-router'
import { useLogin } from '../hooks.ts'
import { NavBar } from 'vant'
import { ref } from 'vue';

useLogin()
const router = useRouter()
const voteStore = useVoteStore()
async function logout() {
  await axios.get('/api/logout') 
  voteStore.user = null

  router.push('/')
}
const onClickLeft = () => history.back();

//拿到登录用户
const currentUser = voteStore.user

const avatar = ref('')
const avatarPath = currentUser?.avatarUrl 
avatar.value = avatarPath ? ('http://192.168.3.11:3000/api' + avatarPath) : 'https://dummyimage.com/50x50/3a6bea/bccecb'
</script>