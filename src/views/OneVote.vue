<template>
  <div class="bg-[#f2f4f7]">
    <div class="text-center pl-4 pt-[5px]">
      <NavBar :title="`腾讯投票`" left-arrow @click-left="onClickLeft" class="!bg-[#f2f4f7]" />
      <!-- <RouterLink to="null" @click.prevent="goBack" class="flex items-center justify-center">
        <span class="flex leading-4">
          <el-icon class="mr-2"><ArrowLeftBold /></el-icon>
        </span>
        <span class="flex items-center justify-center font-bold">腾讯投票</span>
      </RouterLink> -->
    </div>

    <div class="relative flex flex-col px-4 h-[100px] py-4 gap-1">
      <span class="font-bold">{{ currentVoteInfo.vote.title }}</span>
      <span
        >{{ currentVoteInfo.vote.desc
        }}<span class="text-[#3a6bea]">{{
          currentVoteInfo.vote.multiple !== 0 ? '[多选]' : '[单选]'
        }}</span></span
      >
      <span
        class="absolute block bg-[#3a6bea] text-white w-[45px] h-[45px] rounded-full text-center leading-[45px] text-[40px] right-[16px] top-[10px]"
        @click="copyLink"
        ><el-icon><Share /></el-icon
      ></span>
    </div>

    <ul class="bg-[#f2f4f7] space-y-4">
      <li v-for="(option, i) of currentVoteInfo.options" :key="i" class="bg-white">
        <div class="">
          <div
            class="px-4 relative flex items-center gap-2 h-12 transition-all shadow"
            @click="handleOptClick(option.optionId)"
          >
            <span>{{ option.content }}</span>
            <span v-if="isLoading && option.optionId == isLastClicked" class="animate-spin"
              ><el-icon><Loading></Loading></el-icon
            ></span>
            <span v-else class="text-[25px]">{{ optionChecked[option.optionId] ? '🗳️' : '' }}</span>

            <!-- <span v-if="optionChecked[option.optionId] && !isLoading" class="text-[#3a6bea]"
              ><el-icon><Select /></el-icon
            ></span> -->

            <!-- <span v-if="isLoading && isLastClicked === option.optionId"
              ><LoadingCircle></LoadingCircle
            ></span> -->

            <span class="ml-auto">{{ eachOptionVotes[option.optionId]?.length || 0 }}票</span>

            <span class="w-14 text-right">{{ eachOptPercentage[option.optionId] || '0%' }}</span>

              <div
                class="absolute h-[2px] bg-[#3a6bea] bottom-0 transition-all"
                :style="{ width: eachOptPercentage[option.optionId] }"
              ></div>
          </div>
          <!-- 这里显示头像 -->
          <div>
          
          <div class="flex flex-wrap gap-[8px] py-2 bg-[#f2f4f7] px-4" ref="container">
            <span
              v-for="user of handleAvatarVisible(i)"
              :key="Math.random().toString()"
              class="w-[24px] h-[24px] rounded-full inline-block bg-white"
            >
              <img :src="`http://192.168.3.11:3000/api${user.avatarUrl}`" class="rounded-full"
            /></span>
            <span 
             v-if="hasMore(option.optionId)"
              class="w-6 h-6 rounded-full flex items-center justify-center bg-white"
              @click="isAvatarVisible[i] = !isAvatarVisible[i]"
              ><el-icon><More /></el-icon
            ></span>
          </div>
          </div>
        </div>
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
        class="px-10 py-2 bg-[#3a6bea] text-white rounded mt-[30px] w-7/8 mx-auto ml-auto disabled:bg-[#bcc1cb]"
        :disabled="selectedOptionIds.length === 0"
        @click="submit"
      >
        投票
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, computed, onMounted, useTemplateRef, onUnmounted } from 'vue'
import axios from 'axios'
import { useLogin } from '../hooks.ts'
import { useVoteStore } from '@/stores/vote.ts'
import LoadingCircle from './LoadingCircle.vue'
import { useElementSize } from '@vueuse/core'
// import {useWindowSize} from '../hooks.ts'
import { NavBar, showDialog } from 'vant'

useLogin()
const route = useRoute()
const id = route.params.id
const res = await axios.get('/api/vote/' + id)
const voteStore = useVoteStore()

/**
 * currentVoteInfo = {
 *  vote:{
 *    voteId:
 *    userId:
 *    title:
 *    desc:
 *    deadline:
 *    anonymous:
 *    multiple:
 *  },
 *  options: [
 *    {optionId: 44, content: '选项1'},
 *    {},
 *    {},
 *  ],
 *  userVotes: [
 *    {optionId: 33, avatar: '', userId: 33},
 *    {},
 *    {},
 *  ]
 *
 * }
 */
const currentVoteInfo = reactive(res.data.result) //拿到当前投票的所有信息

//=========================下面是专门用来格式化时间样式
//格式化时间
const timeString = currentVoteInfo.vote.deadline
// 创建一个 Date 对象
const date = new Date(timeString)
// 获取年份、月份、日期、小时和分钟
const year = date.getFullYear()
const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始，所以加1
const day = String(date.getDate()).padStart(2, '0')
const hours = String(date.getHours()).padStart(2, '0')
const minutes = String(date.getMinutes()).padStart(2, '0')
// 组合成所需格式的时间字符串
const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`
//=====================这里写投票逻辑

//类型
export type Vote = {
  voteId: number
  userId: number
  title: string
  desc: string
  deadline: string
  anonymous: string | number
  multiple: string | number
}
// type Option = {
//   optionId: number,
//   content: string,
// }
// type Options = Option[]
type UserVote = {
  optionId: number | string
  avatarUrl: string | null
  userId: number | string
}
// type UserVotes = UserVote[]
// ---------------------------------------------------------

//这种声明也可以
// interface CurrentOptVotes {
//   [key: string]: number
// }

type CurrentOptVotes = Record<string, UserVote[]>
const eachOptionVotes = computed(() => {
  //计算每个选项的得票数
  //{选项id: [用户1， 用户2]}
  const currentOptionVotes: CurrentOptVotes = {}
  for (const opt of currentVoteInfo.userVotes) {
    currentOptionVotes[opt.optionId] = currentVoteInfo.userVotes.filter(
      (it: { optionId: unknown }) => it.optionId === opt.optionId,
    )
  }
  return currentOptionVotes
})
console.log('每个选项的投票情况： eachOptionVotes', eachOptionVotes.value)

type CurrentOptPercentage = Record<string, string>
const eachOptPercentage = computed(() => {
  //计算每个选项的得票数占总人数的比例:      得票数 / 总人数
  const currentOptPercentage: CurrentOptPercentage = {}

  const totalPeople = new Set(currentVoteInfo.userVotes.map((it: UserVote) => it.userId)).size
  //totalPeople = [用户1的ID， 用户2的ID，用户3的ID].length 利用Set去重

  for (const [key, val] of Object.entries(eachOptionVotes.value)) {
    currentOptPercentage[key] = ((val.length / totalPeople) * 100).toFixed(2) + '%'
  }
  return currentOptPercentage
})
/**
 * currentOptPercentage = {
 *   选项1的ID： 投票该选项的人数占总人数的比例(23%),
 *   选项2的ID： 投票该选项的人数占总人数的比例(88%),
 * }
 */

type CurrentUserVotes = {
  [option: string]: boolean
}
const isVotedByCurrentUser = computed(() => {
  //计算当前用户是否投票
  //应该使用对象来存储当前用户对每个选项的投票情况
  /**
   * isVotedByCurrentUser = {
   *   选项1的ID: boolean,
   *   选项2的ID: boolean,
   * }
   */
  //  voteStore.getUserInfo()
  const currentUserVotes: CurrentUserVotes = {}
  for (const key in eachOptionVotes.value) {
    const currentOpt = eachOptionVotes.value[key] as unknown as UserVote[]
    currentUserVotes[key] = currentOpt.some((it: UserVote) => it.userId == voteStore.user?.userId)
  }

  return currentUserVotes
})

const isButtonShow = computed(() => {
  //计算什么条件应该显示完成按钮
  if (!currentVoteInfo.vote.anonymous) {
    //实名不显示
    return false
  }
  const date = new Date().toISOString()
  if (date > currentVoteInfo.vote.deadline) {
    //过期不显示
    return false
  }
  const voted = ref(Object.values(isVotedByCurrentUser.value))
  /**
   * voted = [boolean, boolean, boolean]
   */
  if (currentVoteInfo.vote.anonymous && voted.value.some((it) => it === true)) {
    //匿名且已经投过票不显示
    //匿名只有一次投票机会
    return false
  }
  return true
})

const isLoading = ref(false)
const isLastClicked = ref(-1)
const selectedOptionIds = ref<number[]>([])

function handleOptClick(id: number) {
  debugger
  if (!currentVoteInfo.vote.anonymous) {
    // 实名
    //选中即投票
    isLoading.value = true
    isLastClicked.value = id
    axios
      .post('/api/vote/' + currentVoteInfo.vote.voteId, {
        optionIds: [id],
      })
      .then((res) => {
        console.log('最新的投票信息：', res.data)
        currentVoteInfo.userVotes = res.data.result.userVotes
        isLoading.value = false
        isLastClicked.value = -1
      })
  } else {
    //匿名逻辑
    //先选中， 记录选中的项目， 点击按钮提交
    debugger
    if (isButtonShow.value) {
      //button还在，说明还可以投票

      if (selectedOptionIds.value.includes(id)) {
        const idx = selectedOptionIds.value.indexOf(id)
        selectedOptionIds.value.splice(idx, 1)
      } else {
        if (currentVoteInfo.vote.multiple) {
          selectedOptionIds.value.push(id)
        } else {
          selectedOptionIds.value = [id]
        }
      }
    } else {
      alert('不能继续投票了')
    }
  }
}
const optionChecked = computed(() => {
  //模板中用来显示check的数据
  if (isButtonShow.value) {
    /**
     * res: {33: true, 55: true}
     * 如果button还在,说明当前用户可以投票，显示当前用户的投票情况
     */
    type Res = {
      [key: string]: boolean
    }
    const res: Res = {}
    for (const item of selectedOptionIds.value) {
      res[item] = true
    }
    console.log('selected option ids :', selectedOptionIds.value)
    return res
  } else {
    //如果button不在，说明不可以投票了，显示所有用户的投票情况
    return isVotedByCurrentUser.value
  }
})
console.log('option checked: ', optionChecked.value)
//投票提交按钮
function submit() {
  debugger
  axios
    .post('/api/vote/' + currentVoteInfo.vote.voteId, {
      optionIds: selectedOptionIds.value,
    })
    .then((res) => {
      currentVoteInfo.userVotes = res.data.result.userVotes
    })
}

//使用web socket实时连接
onMounted(() => {
  const ws = new WebSocket(`ws://${location.host}/realtime-voteinfo/${id}`)
  //ws连接成功后，每个设备更新的消息都能在每个设备查看到，
  ws.onmessage = (e) => {
    const userVotes = JSON.parse(e.data)
    //将这个消息更新到当前信息就可以实现实时更新
    currentVoteInfo.userVotes = userVotes
  }

  onUnmounted(() => {
    ws.close()
  })
})

//摆放头像
const container = useTemplateRef('container')
const { width } = useElementSize(container)
// const  width = useWindowSize()
const isAvatarVisible = ref<boolean[]>(new Array(currentVoteInfo.options.length).fill(false)) //所有选项默认不展开

const avatarCounts = computed((): number => {
  return Math.floor(width.value / 32) - 1
})


function handleAvatarVisible(i: number) {
  const { optionId } = currentVoteInfo.options[i]
  if (isAvatarVisible.value[i]) {
    //如果为展开状态
    return eachOptionVotes.value[optionId]
  } else {
    return eachOptionVotes.value[optionId]?.slice(0, avatarCounts.value)
  }
}

//控制显示更多的头像的展开符号
const hasMore = (optionId: string) => {
  debugger
  if (eachOptionVotes.value[optionId]) {
    console.log(eachOptionVotes.value)
    return true
  } else {
    return false
  }
}

//如果没有人投票，最后不显示三个点
// const isTreePoints = computed(() => {
// })

//左上角返回上一个页面

const router = useRouter()
const onClickLeft = () => router.push('/vote-type')

// 设置复制链接的弹出框
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
</script>
<style>
:root {
  --van-padding-md: 0;
  --van-nav-bar-icon-color: #3a6bea;
  --el-fill-color-blank: #f2f4f7;
}
</style>
