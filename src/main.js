import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/assets/main.css'
import '@/assets/fonts.css' // font

import router from '@/router/router' // router
import 'bootstrap/dist/css/bootstrap.css' // bootstrap

createApp(App).use(createPinia()).use(router).mount('#app');