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
      <li v-for="(option, i) of options" :key="i" class="relative flex items-center gap-2 h-12 px-4 bg-white shadow" @click="handleOptClick">
        <span>{{ option.content}}</span>
        <span v-if="isVotedByCurrentUser[option.optionId]" class="text-[#3a6bea]"><el-icon><Select /></el-icon></span>
        <span class="ml-auto">{{ eachOptVotes[option.optionId].length }}票</span>
        <span>{{ eachOptPercentage[option.optionId] }}</span>
        <div class="absolute h-[2px] bg-[#3a6bea] bottom-0" :style="{width: eachOptPercentage[option.optionId]}"></div>
      </li>
    </ul>

    <!-- 上面显示完了所有选项 -->
    <div class="px-4 text-[12px] flex text-[#bcc1cb] leading-[40px]">
      <span class="mr-auto">投票截止：{{ formattedDate }}</span>
      <span>吐个槽</span>
      <span id="vertical-bar" class="vertical-bar relative inline-block w-[20px]"></span>
      <span>举报投票</span>
    </div>

    <div class="分割线 h-[40px] bg-[#f2f4f7]"></div>

    <div v-if="isButtonShow" class="text-center bg-[#f2f4f7] pb-[20px]">
      <button
        class="hover:text-[#00bd7e] px-10 py-2 bg-[#3a6bea] text-white rounded mt-[30px] w-7/8 mx-auto ml-auto">
        投票
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import {reactive, ref, computed } from 'vue'
import axios from 'axios'
import { useLogin } from '../hooks.ts'
import { useVoteStore } from '@/stores/vote.ts'

useLogin()
console.log('是否登录: ',useLogin())
const route = useRoute()
const id = route.params.id
const res = await axios.get('/vote/' + id)
const currentVoteInfo = res.data.result; //拿到当前投票的所有信息
console.log('当前投票的所有信息: ', res.data.result)
const data = reactive(res.data.result.vote)
const options = ref(res.data.result.options)

//=========================下面是专门用来格式化时间样式
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

//=====================这里写投票逻辑

//类型
type Vote = {
  voteId: number, 
  userId: number,
  title: string, 
  desc: string, 
  deadline: string, 
  anonymous: string | number,
  multiple: string | number,
}
type Option = {
  optionId: number, 
  content: string,
}
type Options = Option[]
type UserVote = {
  optionId: number |string, 
  avatar: string | null, 
  userId: number | string,
}
type UserVotes = UserVote[]
// ---------------------------------------------------------

const isAnonymous = currentVoteInfo.vote.anonymous === 1 //是否匿名
const isMultile = currentVoteInfo.vote.multiple === 1 //是否多选
console.log('所有的选项： ', currentVoteInfo.options)
console.log('这个投票的信息： ', currentVoteInfo.vote)
console.log('每个选项的用户投票情况： ', currentVoteInfo.userVotes)

//这种声明也可以
// interface CurrentOptVotes {
//   [key: string]: number
// } 

type CurrentOptVotes = Record<string, string[]>
const eachOptVotes = computed(() => {
  //计算每个选项的得票数
  const currentOptVotes: CurrentOptVotes= {}
  for (const opt of currentVoteInfo.userVotes) {
    currentOptVotes[opt.optionId] = currentVoteInfo.userVotes.filter((it: { optionId: unknown }) => it.optionId === opt.optionId)
  }
  return currentOptVotes
})
console.log('eachOptVotes: ', eachOptVotes.value)



type CurrentOptPercentage = Record<string, string>
const eachOptPercentage = computed(() => {
  //计算每个选项的得票数占总人数的比例:      得票数 / 总人数
  const currentOptPercentage:CurrentOptPercentage = {}
  
  const totalPeople = new Set(currentVoteInfo.userVotes.map((it:UserVote) => it.userId)).size
  for (const [key, val] of Object.entries(eachOptVotes.value)) {
    // console.log('key: ', key)
    // console.log('val: ', val)
    debugger
    currentOptPercentage[key] = (val.length / totalPeople * 100).toFixed(2) + '%'
  }
  return currentOptPercentage
})
console.log('当前所有选项的分别占比： ', eachOptPercentage.value)


type CurrentUserVotes = {
  [option: string]: boolean
}
const voteStore = useVoteStore()
const isVotedByCurrentUser = computed(() => {
  //计算当前用户是否投票
  //应该使用对象来存储当前用户对每个选项的投票情况
  const currentUserVotes:CurrentUserVotes = {}
  for (const key in eachOptVotes.value) {
    const currentOpt = eachOptVotes.value[key] as unknown as UserVote[]
    debugger
    currentUserVotes[key] = currentOpt.some((it:UserVote) => it.userId === voteStore.user?.userId)
  }
    
  return currentUserVotes
})
console.log('is voted by current user: ', isVotedByCurrentUser.value)


const isButtonShow = computed(() => {
  //计算什么条件应该显示完成按钮
  if (!isAnonymous) {
    //非匿名不显示
    return false
  }
  const date = new Date().toISOString()
  if (date > currentVoteInfo.vote.deadline) {
    //过期不显示
    return false
  }
  const voted = Object.values(isVotedByCurrentUser.value)
  if (isAnonymous && voted.some(it => it === true)) {
    //匿名且已经投过票不显示
    //匿名只有一次投票机会
    return false 
  }

  return true  
})
console.log('should button show: ', isButtonShow.value)

function handleOptClick() {
  if (!isMultile) {
    //单选逻辑

  } else {
    //多选逻辑

  }
}










//====================下面是数据格式示例
/**
 * res.data = {
 *   "code": 0,
 *   "result": {
 *     "vote": {
 *       "voteId": 127,
 *       "userId": 2,
 *       "title": "3434",
 *       "desc": "34324",
 *       "deadline": "2025-03-30T05:44:48.629Z",
 *       "anonymous": 0,
 *       "multiple": 1
 *     },
 *     "options": [
 *        {
 *          "optionId": 53,
 *          "content": "选项1"
 *        },
 *        {
 *          "optionId": 54,
 *          "content": "选项2"
 *        },
 *      ],
 *      "userVotes": [
 *        {
 *          "optionId": 54,
 *          "avatar": "",
 *          "userId": 17
 *        },
 *        {
 *          "optionId": 53,
 *          "avatar": "http://localhost:8008/uploads/avatar.png",
 *          "userId": 7
 *        },
 *        {
 *          "optionId": 55,
 *          "avatar": "http://localhost:8008/uploads/avatar.png",
 *          "userId": 7
 *        },
 *       ]
 *   }
 * }
 * */
</script>
