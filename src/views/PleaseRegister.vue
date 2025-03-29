<template>
  <div class="text-center">

    <table class="mt-[40px] mx-auto">
      <tbody>
        <tr>
          <td width="100" align="right">账户名:</td>
          <td width="auto" align="left">
            <input
              type="text"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="accountName"
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
         <tr>
          <td width="100" align="right">确认密码:</td>
          <td width="auto" align="left">
            <input
              type="password"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="confirmedPassword"
            />
          </td>
        </tr>
         <tr>
          <td width="100" align="right">邮箱:</td>
          <td width="auto" align="left">
            <input
              type="email"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="email"
            />
          </td>
        </tr>
         <tr>
          <td width="100" align="right">电话:</td>
          <td width="auto" align="left">
            <input
              type="text"
              class="outline-none border-b-[1px] border-[#dddfe7]"
              v-model="tel"
            />
          </td>
        </tr>
         <tr>
          <td width="100" align="right">头像:</td>
          <td width="auto" align="left">
            <input
              type="file"
              class="w-[200px]"
              @change="handleFileChange"
            />
          </td>
        </tr>
         <tr>
          <td width="100" align="right">你是机器人吗？</td>
          <td width="auto" align="left">
            <img :src="svgImg" alt="验证码" @click="reloadCaptcha">
          </td>
        </tr>
        <tr>
          <td width="100" align="right">输入验证码:</td>
          <td width="auto" align="left">
            <input type="text" v-model="captcha">
          </td>
        </tr>
      </tbody>
    </table>

    <div colspan="2" width="auto" align="center" class="bg-[#e3f2fd] py-[8px] rounded-[5px] mt-[30px]">
      <button class="w-full" @click="register">注册</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useVoteStore } from '@/stores/vote'

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
fetchCaptcha()//初次加载时获取一次验证码

async function reloadCaptcha() {
  await fetchCaptcha() 
}

//拿到头像文件
function handleFileChange(e: any) {
  avatarUrl.value = e.target.files[0]
}

const router = useRouter()
async function register() {

const formData = new FormData();
formData.append("avatarUrl", avatarUrl.value);  // 文件字段
formData.append("accountName", accountName.value);
formData.append("password", password.value);
formData.append("confirmedPassword", confirmedPassword.value);
formData.append("email", email.value);
formData.append("tel", tel.value);
formData.append("captcha", captcha.value);

const res = await axios.post('/api/register', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

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
