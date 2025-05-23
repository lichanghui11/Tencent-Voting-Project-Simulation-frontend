import { createRouter, createWebHashHistory } from 'vue-router'
import VoteType from '../views/VoteType.vue'
import HomeView from '@/views/HomeView.vue'
import { useVoteStore } from '@/stores/vote'
// import PleaseLogin from '@/views/PleaseLogin.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home-view',
      component: HomeView,
      children: [
        // {
        //   path: '',
        //   redirect: 'vote-type',
        // },
        {
          path: 'vote-type',
          name: 'vote-type',
          alias: '',
          component: VoteType,
        },
        {
          path: 'me',
          name: 'me',
          component: () => import('../views/MePage.vue'),
          beforeEnter: (to, _from, next) => {
            const voteStore = useVoteStore()
            if (!voteStore.user) {
              next('/login?next=' + to.fullPath)
            } else {
              next()
            }
          },
        },
      ],
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateVote.vue'),
    },
    {
      path: '/vote/:id',
      name: 'vote',
      component: () => import('../views/OneVote.vue'),
    },
    {
      path: '/my-votes',
      name: 'my-votes',
      component: () => import('../views/MyVotes.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/PleaseLogin.vue'),
    },
    {
      path: '/my-settings',
      name: 'my-settings',
      component: () => import('../views/MySettings.vue'),
    },
    {
      path: '/set-name',
      name: 'set-name',
      component: () => import('../views/SetName.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/PleaseRegister.vue'),
    },
  ],
})

export default router
