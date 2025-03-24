<template>
  <div>

    <div class="bg-white ">
      <div class="text-center pl-4 pb-4 pt-[5px] flex ">
        <RouterLink to="/vote-type" class="flex items-center justify-center">
          <span class="flex leading-4 ">
            <el-icon class="mr-2"><ArrowLeftBold /></el-icon>
          </span>
        <span class="flex items-center justify-center font-bold">创建{{ type }}投票</span>
        </RouterLink>
      </div>

      <div class="flex flex-col space-y-2 pl-4 pr-4">
        <input
          class="focus:ring border-b-[1px] my-2 text-[30px] border-[#dddfe7] leading-[50px]"
          type="text"
          placeholder="投票标题"
          v-model="title"
        />
        <input
          class="focus:ring border-b-[1px] my-2 text-[] border-[#dddfe7] leading-[50px]"
          type="text"
          placeholder="补充描述(选填)"
          v-model="description"
        />
        <div class="flex items-center gap-[10px] w-full" v-for="(option, i) of options" :key="i">
          <span
            @click="deleteOption(i)"
            class="pseudo-delete cursor-pointer relative inline-block w-[20px] h-[20px] bg-red-600 rounded-full"
          ></span>
          <input
            class="focus:ring w-full border-b-[1px] text-xl border-[#dddfe7] leading-[50px]"
            type="text"
            placeholder="选项"
            v-model="options[i]"
          />
        </div>
        <div
          class="text-[#3a6bea] flex items-center gap-[10px] w-full cursor-pointer h-[50px] "
          @click="addOption"
        >
          <span
            class="pseudo-add cursor-pointer relative inline-block w-[20px] h-[20px] rounded-full bg-[#3a6bea]"
          ></span>
          <button class="w-full text-left cursor-pointer">添加选项</button>
        </div>
      </div>
    </div>

    <div class="分割线 h-[40px] bg-[#f2f4f7]"></div>

    <div class=" space-y-2 bg-white pl-4 pr-4 ">
      <div class="h-[50px] border-b-[1px] border-[#dddfe7] flex justify-between items-center">
        截止日期
        <el-date-picker
          class=""
          v-model="deadline"
          type="datetime"
          placeholder="请选择截止时间"
          :editable="false"
          :popper-append-to-body="true"
          format="YYYY-MM-DD HH:mm"
          style="width: 175px"
        />
      </div>
      <div class="h-[50px] border-b-[1px] border-[#dddfe7] flex justify-between items-center">
        匿名投票
        <SliderSwitch v-model="anonymous" />
      </div>
    </div>

    <div class="分割线 h-[40px] bg-[#f2f4f7]"></div>

    <div class="text-center bg-[#f2f4f7] pb-[20px]">
      <button
        class="hover:text-[#00bd7e] px-10 py-2 bg-[#3a6bea] text-white rounded mt-[30px] w-7/8 mx-auto ml-auto"
        @click="create"
      >
        完成
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import SliderSwitch from './SliderSwitch.vue'
import { useVoteStore } from '@/stores/vote.ts'
import axios from 'axios'
import { useLogin } from '../hooks.ts'

const route = useRoute()
const router = useRouter()
const type = computed(() => (route.query.type === 'single' ? '单选' : '多选'))
const voteStore = useVoteStore()
console.log('用户登录信息： ', voteStore.user)


const options = ref([''])
const title = ref('')
const description = ref('')
const deadline = ref(new Date(Date.now() + 86400000 * 7))
const anonymous = ref(false)

function addOption() {
  options.value.push('')
}
function deleteOption(i: number) {
  options.value.splice(i, 1)
}


const multiple = computed(() => type.value === '多选')

const isLogin =  useLogin()
async function create() {
  const voteInfo = {
    title: title.value,
    desc: description.value,
    deadline: deadline.value,
    anonymous: anonymous.value,
    multiple: multiple.value,
    options: options.value,
  }
  const res = await axios.post('/vote', voteInfo)
  if (isLogin) {
    //登录成功
    const id = res.data.result.voteId
    router.replace('/vote/' + id)
    console.log('发送过去的数据： ', JSON.parse(res.config.data))
  } else {
    router.push('/login?next=' + route.fullPath)
  }
}
// console.log('当前组件的完整路径: ', route.fullPath)
</script>
