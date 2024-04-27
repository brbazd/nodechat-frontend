import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import { socket } from '../socket.js'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: localStorage.user ? JSON.parse(localStorage.user) : null,
    returnUrl: null
  }),
  actions: {
    async login(email, password) {
      console.log({ email, password })
      const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {
        email,
        password
      })
      if (res.status == 201) {
        console.log(res)
        const user = res.data.User
        this.user = user

        localStorage.user = JSON.stringify(user)

        socket.connect()

        router.push(this.returnUrl || { name: 'home' })
      }
    },
    logout() {
      this.user = null

      const res = axios.get(import.meta.env.VITE_API_URL + '/auth/logout')
      localStorage.user = null
      socket.disconnect()
      router.push('/login')
    },

    async checkUser() {
      axios
        .get(import.meta.env.VITE_API_URL + '/auth/verify_user')
        .then((res) => {
          this.user = res.data
          localStorage.user = JSON.stringify(res.data)
          socket.connect()

          return this.user
        })
        .catch((error) => {
          this.user = null
          localStorage.user = null
          router.push('/login')
          return null
        })
    }
  }
})
