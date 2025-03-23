import { ref } from 'vue'
import { useVoteStore } from './stores/vote'
import { useRoute, useRouter } from 'vue-router'

export function useCurrentI() {
  const currentI = ref(-1)

  function setCurrentI(i:number) {
    if (currentI.value === i) currentI.value = -1
    else currentI.value = i
  } 

  return [currentI, setCurrentI] as const
}

export function useLogin() {
  const router = useRouter()
  const route = useRoute()
  const voteStore = useVoteStore()  

  debugger
  if (voteStore.user === null) {
    //用户未登录
    router.replace('/login?next=' + route.fullPath)
    return false
  } 

  return true
}