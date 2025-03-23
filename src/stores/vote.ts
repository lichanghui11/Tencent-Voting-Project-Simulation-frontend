import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

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
      const userInfo = await axios.get('http://localhost:5175/account/current-user')
      user.value = userInfo.data
    } catch (e) {
      if (e.isAxiosError) {
        console.log('请求当前用户失败的错误：  ', e)
      } else {
        throw e
      }
    }

  }
  return {user, getUserInfo} 
})
