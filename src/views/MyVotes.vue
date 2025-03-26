<template>
  <div class="bg-[#f2f4f7]">
    <textarea class="hiddedEl" type="text" hidden></textarea>
    <div class="text-center px-4 pt-[5px]">
      <NavBar :title="`我的投票`" left-arrow @click-left="onClickLeft" class="!bg-[#f2f4f7]" />
      <!-- <RouterLink to="/me" class="flex items-center justify-center">
        <span class="flex leading-4">
          <el-icon class="mr-2"><ArrowLeftBold /></el-icon>
        </span>
        <span class="flex items-center justify-center font-bold">我的投票</span>
      </RouterLink> -->
    </div>

    <div class="mb-16">
      <div class="bg-white" v-for="(vote, i) of myVotes" :key="i">
        <div
          class="h-[50px] px-4 hover:text-[#3a6bea] border-b-[1px] border-[#f2f4f7] leading-[50px]"
          @click="setCurrentI(i)"
        >
          <div class="flex justify-between">
            <span>{{ vote.title }}</span>
            <span>9</span>
          </div>
        </div>

        <div
          class="flex basis-0 grow px-4 h-[50px] justify-around items-center border-b-[1px] border-[#f2f4f7] leading-[50px] transition-[0.4]"
          :class="{ hidden: currentI !== i }"
        >
          <RouterLink to="" class="text-[14px] basis-0 grow flex flex-col items-center text-black">
            <span class="h-[18px] text-[#3a6bea]"
              ><el-icon><Edit /></el-icon
            ></span>
            编辑
          </RouterLink>

          <RouterLink
            :to="`/vote/${vote.voteId}`"
            class="text-[14px] basis-0 grow flex flex-col items-center text-black"
          >
            <span class="h-[18px] text-[#3a6bea]"
              ><el-icon><View /></el-icon
            ></span>
            查看
          </RouterLink>

          <RouterLink
            to=""
            class="text-[14px] basis-0 grow flex flex-col items-center text-black"
            @click="copyLink"
          >
            <span class="h-[18px] text-[#3a6bea]"
              ><el-icon><Share /></el-icon
            ></span>
            分享
          </RouterLink>

          <RouterLink
            to=""
            class="text-[14px] basis-0 grow flex flex-col items-center text-black"
            @click="deleteVote(vote, i)"
          >
            <span class="h-[18px] text-[#3a6bea]"
              ><el-icon><Delete /></el-icon
            ></span>
            删除
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCurrentI } from '@/hooks'
import axios from 'axios'
import { useLogin } from '../hooks.ts'
import { NavBar, showConfirmDialog, showDialog } from 'vant'
import { type Vote } from './OneVote.vue'

const myVotes = ref<Vote[]>([])
try {
  const res = await axios.get('/vote')
  myVotes.value = res.data.result
  console.log('my votes: ', myVotes.value)
  // function getVoteFolks(voteId) {
  //   //拿到每个vote 的投票参与人数

  // }
} catch {
  myVotes.value = []
  useLogin()
}

const [currentI, setCurrentI] = useCurrentI()
const onClickLeft = () => history.back()

//设置复制链接的弹出框
function copyLink() {
  const currentUrl = window.location.href

  // 尝试使用 Clipboard API（需要 HTTPS）
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        // 复制成功
        showDialog({
          title: '成功',
          message: '链接已成功复制！',
        })
      })
      .catch(() => {
        // 复制失败
        showDialog({
          title: '失败',
          message: '复制失败，请重试。',
        })
      })
  } else {
    // 如果 Clipboard API 不支持，使用旧方法（document.execCommand）
    const input = document.createElement('input')
    input.value = currentUrl
    input.style.position = 'absolute'
    input.style.left = '-9999px'
    document.body.appendChild(input)
    input.select() //选中内容
    input.setSelectionRange(0, 99999) // 为了兼容移动端
    try {
      const successful = document.execCommand('copy')
      if (successful) {
        showDialog({
          title: '成功',
          message: '链接已成功复制！',
        })
      } else {
        throw new Error('复制失败')
      }
    } catch {
      showDialog({
        title: '失败',
        message: '复制失败，请重试。',
      })
    }
    document.body.removeChild(input)
  }
}

//删除某个投票
function deleteVote(vote: Vote, i: number) {
  showConfirmDialog({
    message: `确认删除 [${vote.title}] 吗？`,
  })
    .then(async () => {
      try {
        await axios.delete(`/vote/${vote.voteId}`)
        myVotes.value.splice(i, 1)
        setCurrentI(-1)
      } catch (e) {
        console.log('删除失败: ', e)
      }
    })
    .catch(() => {})
}
</script>

<style>
:root {
  --van-padding-md: 0;
  --van-nav-bar-icon-color: #3a6bea;
  --el-fill-color-blank: #f2f4f7;
}
</style>
