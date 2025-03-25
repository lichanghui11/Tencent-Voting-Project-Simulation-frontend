<template>
  <div class="bg-[#f2f4f7] ">

    <div class="text-center pl-4 pb-4 pt-[5px] flex justify-between">
      <RouterLink to="/me" class="flex items-center justify-center">
        <span class="flex leading-4">
          <el-icon class="mr-2"><ArrowLeftBold /></el-icon>
        </span>
        <span class="flex items-center justify-center font-bold">我的投票</span>
      </RouterLink>
    </div>

    <div class="mb-16">
      <div class="bg-white" v-for="(vote, i) of myVotes" :key="i" >
        <div class="h-[50px] px-4 hover:text-[#00bd73] border-b-[1px] border-[#f2f4f7] leading-[50px]" @click="setCurrentI(i)">
          <div class="flex justify-between">
            <span>{{ vote.title }}</span>
            <span>9</span>
          </div>
        </div>

        <div class="flex basis-0 grow px-4 h-[50px] justify-around items-center border-b-[1px] border-[#f2f4f7] leading-[50px] transition-[0.4]" :class="{hidden: currentI !== i}">

          <RouterLink to="" class="text-[14px] basis-0 grow flex flex-col items-center  text-black">
            <span class="h-[18px] text-[#3a6bea]"><el-icon><Edit /></el-icon></span>
            编辑
          </RouterLink>

          <RouterLink :to="`/vote/${vote.voteId}`" class="text-[14px] basis-0 grow flex flex-col items-center  text-black">
            <span class="h-[18px] text-[#3a6bea]"><el-icon><View /></el-icon></span>
            查看
          </RouterLink>

          <RouterLink to="" class="text-[14px] basis-0 grow flex flex-col items-center  text-black">
            <span class="h-[18px] text-[#3a6bea]"><el-icon><Share /></el-icon></span>
            分享
          </RouterLink>

          <RouterLink to="" class="text-[14px] basis-0 grow flex flex-col items-center  text-black">
            <span class="h-[18px] text-[#3a6bea]"><el-icon><Delete /></el-icon></span>
            删除
          </RouterLink>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useCurrentI } from '@/hooks'
import axios from 'axios'
import { useLogin } from '../hooks.ts'

useLogin()
const res = await axios.get('/vote')
const myVotes = res.data.result


const [currentI, setCurrentI] = useCurrentI()

</script>
