import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { seedData } from './utils/seedData.js'

// Seed dữ liệu mẫu
seedData()

const app = createApp(App)

app.use(router)

app.mount('#app')
