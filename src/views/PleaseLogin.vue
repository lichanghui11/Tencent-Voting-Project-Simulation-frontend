<template>
  <div class="text-center">

    <div class="mt-[100px] text-[40px]">✅</div>
    <div class="text-3xl font-[800] mt-[10px]">来投票吧</div>
    <div class="mt-[50px]">请登录投票应用</div>
    <div class="mt-[20px]">以保证各项功能正常使用</div>

    <table class="mt-[40px] mx-auto">
      <tbody>
        <tr>
          <td width="100" align="right">账户名:</td>
          <td width="auto" align="left">
            <input
              type="text"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="name"
            />
          </td>
        </tr>
        <tr>
          <td width="100" align="right">密码:</td>
          <td width="auto" align="left">
            <input
              type="password"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="password"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div colspan="2" width="auto" align="center" class="bg-[#e3f2fd] py-[8px] rounded-[5px] mt-[30px]">
      <button class="w-full" @click="login">登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useVoteStore } from '@/stores/vote'

const route = useRoute()
const router = useRouter()
const userStore = useVoteStore()

const password = ref('')
const name = ref('')
const next = (route.query.next ?? '/') as string
async function login() {
  try {
    debugger
    const user = await axios.post('/account/login', {
      name: name.value,
      password: password.value,
    })
    userStore.user = user.data.result
    console.log('查看store里面的数据： ', userStore)
    router.replace(next)
  } catch (e) {
    alert('登录失败')
    console.log('登录失败的错误: ', e)
  }
}
console.log('userStore里面的user数据： ', userStore.user)
console.log('下一个页面: ', route.query.next)


</script>
