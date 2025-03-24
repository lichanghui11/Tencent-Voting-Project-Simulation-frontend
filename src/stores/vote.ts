import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'

type User = {
  userId: number, 
  name: string, 
  email: string, 
  avatar: string,
}
export const useVoteStore = defineStore('vote', () => {
  const user = ref<User | null>(null)

  async function getUserInfo() {
    try {
      const userInfo = await axios.get('http://192.168.3.11:3000/account/current-user')
      user.value = userInfo.data
    } catch (e) {
      const err = e as AxiosError
      if (err.isAxiosError) {
        console.log('请求当前用户失败的错误：  ', e)
      } else {
        throw e
      }
    }

  }
  return {user, getUserInfo} 
})
