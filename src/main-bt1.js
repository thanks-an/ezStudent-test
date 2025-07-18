import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { seedData } from './utils/seedData.js'
import { setAppConfig } from './config/appConfig.js'

// Cấu hình cho bài tập 1 (chỉ quản lý học sinh)
setAppConfig('BT1')

// Seed dữ liệu mẫu
seedData()

const app = createApp(App)

app.use(router)

app.mount('#app')
