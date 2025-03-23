<template>
  <div class="bg-[#f2f4f7]">
    <div class="text-center pl-4 pb-4 pt-[5px] flex justify-between">
      <RouterLink to="/create" class="flex items-center justify-center">
        <span class="flex leading-4">
          <el-icon class="mr-2"><ArrowLeftBold /></el-icon>
        </span>
        <span class="flex items-center justify-center font-bold">腾讯投票</span>
      </RouterLink>
    </div>

    <div class="relative flex flex-col px-4 h-[100px] py-4 gap-1 ">
      <span class="font-bold">{{ data.title }}</span>
      <span>{{ data.desc }}<span class="text-[#3a6bea]">{{ data.multiple !== 0 ? '[多选]' : '[单选]' }}</span></span>
      <span
        class="absolute block bg-[#3a6bea] text-white w-[45px] h-[45px] rounded-full text-center leading-[45px] text-[40px] right-[16px] top-[10px]"
        ><el-icon><Share /></el-icon
      ></span>
    </div>

    <ul class=" bg-[#f2f4f7] space-y-4">
      <li v-for="(option, i) of options" :key="i" class="relative flex items-center gap-2 h-12 px-4 bg-white shadow ">
        <span>{{ option.content}}</span>
        <span class="text-[#3a6bea]"><el-icon><Select /></el-icon></span>
        <span class="ml-auto">3票</span>
        <span>0%</span>
        <div class="absolute h-[2px] w-1/4 bg-[#3a6bea] bottom-0"></div>
      </li>
    </ul>

    <!-- 上面显示完了所有选项 -->
    <div class="px-4 text-[14px] flex text-[#bcc1cb] leading-[40px]">
      <span class="mr-auto">投票截止：{{ formattedDate }}</span>
      <span>吐个槽</span>
      <span id="vertical-bar" class="vertical-bar relative inline-block w-[20px]"></span>
      <span>举报投票</span>
    </div>


    <div class="分割线 h-[40px] bg-[#f2f4f7]"></div>

    <div class="text-center bg-[#f2f4f7] pb-[20px]">
      <button
        class="hover:text-[#00bd7e] px-10 py-2 bg-[#3a6bea] text-white rounded mt-[30px] w-7/8 mx-auto ml-auto">
        投票
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import {reactive, ref} from 'vue'
import axios from 'axios'
import { useLogin } from '../hooks.ts'

useLogin()
const route = useRoute()
const id = route.params.id
const res = await axios.get('/vote/' + id)
console.log('请求到的信息： ', res.data.result)
const data = reactive(res.data.result.vote)
const options = ref(res.data.result.options)


//格式化时间
const timeString = data.deadline

// 创建一个 Date 对象
const date = new Date(timeString);

// 获取年份、月份、日期、小时和分钟
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
const day = String(date.getDate()).padStart(2, '0');
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');

// 组合成所需格式的时间字符串
const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
</script>
