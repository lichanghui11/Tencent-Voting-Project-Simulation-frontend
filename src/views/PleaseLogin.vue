<template>
  <div class="relative">
  <div class="text-center px-4 ">
    <NavBar :title="`欢迎登录本投票应用`" class="nav-bar !bg-[#f2f4f7] shadow"></NavBar>

    <table class="mx-auto text-[16px] mt-[100px]">
      <tbody>
        <tr class="h-[50px] leading-[50px]">
          <td width="100" align="right" class="px-4">账户名:</td>
          <td width="auto" align="left">
            <input
              type="text"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="name"
            />
          </td>
        </tr>
        <tr class="h-[50px] leading-[50px]">
          <td width="100" align="right" class="px-4">密码:</td>
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

    <div class="bg-[#3a6bea] text-white py-[8px] rounded-[5px] mt-[90px]">
      <button class="w-full" @click="login">登录</button>
    </div>没有账号？
    <RouterLink to="/register" class=""><span class="border-b-1 shadow">去注册</span></RouterLink>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useVoteStore } from '@/stores/vote'
import { NavBar } from 'vant'
const route = useRoute()
const router = useRouter()
const voteStore = useVoteStore()

const password = ref('')
const name = ref('')
const next = (route.query.next ?? '/') as string
async function login() {
  try {
    const user = await axios.post('/api/login', {
      accountName: name.value,
      password: password.value,
    })
    console.log(user.data)
    voteStore.user = user.data.result
    router.replace(next)
  } catch (e) {
    alert('登录失败')
    console.log('登录失败的错误: ', e)
  }
}
</script>
