import { createRouter, createWebHashHistory } from 'vue-router'
import VoteType from '../views/VoteType.vue'
import HomeView from '@/views/HomeView.vue'
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
          name:'vote-type',
          alias: '',
          component: VoteType,
        }, 
        {
          path: 'me', 
          name: 'me', 
          component: () => import('../views/MePage.vue'),
        }
      ]
    },
    {
      path: '/create', 
      name: 'create', 
      component: () => import('../views/CreateVote.vue')
    },
    {
      path: '/vote/:id',
      name: 'vote',
      component: () => import('../views/OneVote.vue'),
    },
    {
      path: '/my-votes', 
      name: 'my-votes', 
      component: () => import('../views/MyVotes.vue')
    }, 
    {
      path: '/login', 
      name: 'login', 
      component: () => import('../views/PleaseLogin.vue')
    }, 
    {
      path: '/my-settings',
      name:'my-settings',
      component: () => import('../views/MySettings.vue')
    },
    {
      path: '/set-name', 
      name: 'set-name',
      component: () => import('../views/SetName.vue')
    },
  ],
})

export default router
