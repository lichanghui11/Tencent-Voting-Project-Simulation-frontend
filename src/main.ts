import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'vant/lib/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import MainApp from '../MainApp.vue'
import router from './router'

const app = createApp(MainApp )
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
