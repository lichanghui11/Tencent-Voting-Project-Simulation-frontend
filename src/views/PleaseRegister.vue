<template>
  <div class="text-center px-4">
    <NavBar :title="`欢迎注册本投票应用`" class="nav-bar !bg-[#f2f4f7]"></NavBar>

    <table class="mx-auto text-[16px] mt-[50px]">
      <tbody>
        <tr class="h-[50px] leading-[50px]">
          <td class="px-4" width="200" align="right">账户名:</td>
          <td width="auto" align="left">
            <input
              type="text"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="accountName"
            />
          </td>
        </tr>

        <tr class="h-[50px] leading-[50px]">
          <td class="px-4" width="200" align="right">密码:</td>
          <td width="auto" align="left">
            <input
              type="password"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="password"
            />
          </td>
        </tr>

        <tr class="h-[50px] leading-[50px]">
          <td class="px-4" width="200" align="right">确认密码:</td>
          <td width="auto" align="left">
            <input
              type="password"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="confirmedPassword"
            />
          </td>
        </tr>

        <tr class="h-[50px] leading-[50px]">
          <td class="px-4" width="200" align="right">邮箱:</td>
          <td width="auto" align="left">
            <input
              type="email"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="email"
            />
          </td>
        </tr>

        <tr class="h-[50px] leading-[50px]">
          <td class="px-4" width="200" align="right">电话:</td>
          <td width="auto" align="left">
            <input type="text" class="outline-none border-b-[1px] border-[#dddfe7]" v-model="tel" />
          </td>
        </tr>

        <tr class="h-[50px] leading-[50px]">
          <td class="px-4" width="200" align="right">头像:</td>
          <td width="auto" align="left">
            <input
              type="file"
              class="w-full outline-none border-b-[1px] border-[#dddfe7]"
              @change="handleFileChange"
            />
          </td>
        </tr>

        <tr class="h-[50px] leading-[50px]">
          <td class="px-4" width="200" align="right">你是机器人吗？</td>
          <td width="auto" align="left">
            <img :src="svgImg" alt="验证码" @click="reloadCaptcha" />
          </td>
        </tr>

        <tr class="h-[50px] leading-[50px]">
          <td class="px-4" width="200" align="right">输入验证码:</td>
          <td width="auto" align="left">
            <input type="text" class="outline-none border-b-1 border-[#dddfe7]" v-model="captcha" />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="bg-[#3a6bea] text-white py-[8px] rounded-[5px] mt-[30px]">
      <button class="w-full" @click="register">注册</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'
import { useVoteStore } from '@/stores/vote'
import { NavBar } from 'vant'

const accountName = ref('')
const password = ref('')
const confirmedPassword = ref('')
const tel = ref('')
const email = ref('')
const captcha = ref('')
const avatarUrl = ref('')

//获取验证码图片
const svgImg = ref('')
async function fetchCaptcha() {
  try {
    const captcha = await axios.get('/api/captcha')
    console.log('验证码： ', captcha.data)
    svgImg.value = captcha.data.captchaUrl
  } catch {
    alert('未能获取到验证码图片')
  }
}
fetchCaptcha() //初次加载时获取一次验证码

async function reloadCaptcha() {
    await fetchCaptcha()
}

//拿到头像文件
function handleFileChange(e: any) {
  avatarUrl.value = e.target.files[0]
}

const router = useRouter()
async function register() {
  //带有文件的表单数据不能使用json格式的数据进行发送
  const formData = new FormData()
  formData.append('avatarUrl', avatarUrl.value) // 文件字段
  formData.append('accountName', accountName.value)
  formData.append('password', password.value)
  formData.append('confirmedPassword', confirmedPassword.value)
  formData.append('email', email.value)
  formData.append('tel', tel.value)
  formData.append('captcha', captcha.value)

  const res = await axios.post('/api/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  // const res = await axios.post('/api/register', {
  //   accountName: accountName.value,
  //   password: password.value,
  //   confirmedPassword: confirmedPassword.value,
  //   email: email.value,
  //   tel: tel.value,
  //   captcha: captcha.value,
  //   avatarUrl: avatarUrl.value,
  // })
  //这里需要根据请求返回的信息处理对应的提示{code: -1, msg}
  const msg = res.data
  if (msg.code === -1) {
    alert(msg.msg)
  } else {
    router.replace('/login')
  }
}
</script>

<style scoped>
.nav-bar {
  box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.2);
}
</style>
