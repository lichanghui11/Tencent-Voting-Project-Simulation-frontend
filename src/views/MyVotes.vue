<template>
  <div class="bg-[#f2f4f7]">
    <textarea class="hiddedEl" type="text" hidden></textarea>
    <div class="text-center px-4 pt-[5px]">
      <NavBar :title="`我的投票`" left-arrow @click-left="onClickLeft" class="!bg-[#f2f4f7] !px-0" />
      <!-- <RouterLink to="/me" class="flex items-center justify-center">
        <span class="flex leading-4">
          <el-icon class="mr-2"><ArrowLeftBold /></el-icon>
        </span>
        <span class="flex items-center justify-center font-bold">我的投票</span>
      </RouterLink> -->
    </div>

    <div class="mb-16">
      <div class="bg-white cursor-pointer" v-for="(vote, i) of myVotes" :key="i">
        <div
          class="h-[50px] px-4 hover:text-[#3a6bea] border-b-[1px] border-[#f2f4f7] leading-[50px]"
          @click="setCurrentI(i)"
        >
          <div class="flex justify-between">
            <span>{{ vote.title }}</span>
            <span class="text-[#bcc1cb] text-[14px]">{{ vote.totalCount !== 0 ? vote.totalCount : 0 }}</span>
          </div>
        </div>

        <div
          class="flex basis-0 grow px-4 h-[50px] justify-around items-center border-b-[1px] border-[#f2f4f7] leading-[50px] pb-4 transition-[0.4]"
          :class="{ hidden: currentI !== i }"
        >
          <RouterLink
            :to="`/vote/${vote.voteId}`"
            class="text-[14px] basis-0 grow flex flex-col items-center text-black"
          >
            <span class="h-[18px] hover:text-[#3a6bea] relative"
              ><el-icon class="!w-4 !absolute left-1/2 transform -translate-x-1/2"><View /></el-icon
            >查看</span>
            
          </RouterLink>

          <RouterLink
            to=""
            class="text-[14px] basis-0 grow flex flex-col items-center text-black"
          >
            <span class="h-[18px] hover:text-[#3a6bea] relative " @click="showShare = !showShare">

              <el-icon class="!w-4 !absolute left-1/2 transform -translate-x-1/2"><Share /></el-icon>
              分享

            </span>
            
            <ActionSheet v-model:show="showShare" :actions="actions" cancel-text="取消" close-on-click-action @cancel="onCancel"/>
          </RouterLink>

          <RouterLink
            to=""
            class="text-[14px] basis-0 grow flex flex-col items-center text-black"
            @click="deleteVote(vote, i)"
          >
            <span class="h-[18px]  hover:text-[#3a6bea] relative "
              ><el-icon class="!w-4 !absolute left-1/2 transform -translate-x-1/2"><Delete /></el-icon
            >删除</span>
            
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
import { NavBar, showConfirmDialog, ActionSheet, showToast} from 'vant'
import copy from 'copy-to-clipboard'

const myVotes = ref([] as any)
try {
  const res = await axios.get('/api/vote')
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
// function copyLink() {
//   const currentUrl = window.location.href

//   // 尝试使用 Clipboard API（需要 HTTPS）
//   if (navigator.clipboard) {
//     navigator.clipboard
//       .writeText(currentUrl)
//       .then(() => {
//         // 复制成功
//         showDialog({
//           title: '成功',
//           message: '链接已成功复制！',
//         })
//       })
//       .catch(() => {
//         // 复制失败
//         showDialog({
//           title: '失败',
//           message: '复制失败，请重试。',
//         })
//       })
//   } else {
//     // 如果 Clipboard API 不支持，使用旧方法（document.execCommand）
//     const input = document.createElement('input')
//     input.value = currentUrl
//     input.style.position = 'absolute'
//     input.style.left = '-9999px'
//     document.body.appendChild(input)
//     input.select() //选中内容
//     input.setSelectionRange(0, 99999) // 为了兼容移动端
//     try {
//       const successful = document.execCommand('copy')
//       if (successful) {
//         showDialog({
//           title: '成功',
//           message: '链接已成功复制！',
//         })
//       } else {
//         throw new Error('复制失败')
//       }
//     } catch {
//       showDialog({
//         title: '失败',
//         message: '复制失败，请重试。',
//       })
//     }
//     document.body.removeChild(input)
//   }
// }
const showShare = ref(false)
const actions = ref([
  {
    name: '复制当前投票项目的链接', 
    function() {
      copy(location.href)
      showToast('复制成功')
    }
  },
  { name: '选项二' },
  { name: '选项三' }
])
// const onSelect = (actions: ActionSheetAction, id: number) => {
 
// }
const onCancel = () => showToast('取消')
//删除某个投票
function deleteVote(vote: any, i: number) {
  showConfirmDialog({
    message: `确认删除 [${vote.title}] 吗？`,
  })
    .then(async () => {
      try {
        await axios.delete(`/api/vote/${vote.voteId}`)
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
