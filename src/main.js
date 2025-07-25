import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { seedData } from './utils/seedData.js'
import { setAppConfig } from './config/appConfig.js'

// Cấu hình dựa trên môi trường build
const appMode = typeof __APP_MODE__ !== 'undefined' ? __APP_MODE__ : 'BT2'
setAppConfig(appMode)

// Seed dữ liệu mẫu
seedData()

const app = createApp(App)

app.use(router)

app.mount('#app')
