import { onMounted, onUnmounted, ref } from 'vue'
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

  if (voteStore.user === null) {
    //用户未登录
    router.replace('/login?next=' + route.fullPath)
    return false
  } 

  return true
}



let isSubscribed = false 
const width = ref({
  width: window.innerWidth,
})
function handleWindowEvent() {
  width.value.width = window.innerWidth
}
export function useWindowSize() {
  //根据父元素的宽度来摆放头像的个数
  if (!isSubscribed) {
    isSubscribed = true
    onMounted(() => {
      window.addEventListener('resize', handleWindowEvent)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', handleWindowEvent)
    })
  }
  return width
}