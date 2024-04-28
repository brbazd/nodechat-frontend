import './assets/main.css'

import '../style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth.store'
import { socket } from './socket'
import axios from 'axios'

const app = createApp(App)

axios.defaults.withCredentials = true

app.use(createPinia())

const authStore = useAuthStore()

authStore.checkUser()
app.use(router)

if (authStore.user) {
  socket.connect()
}

app.mount('#app')
