import { reactive } from 'vue'
import { io } from 'socket.io-client'
import { useAuthStore } from './stores/auth.store'

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
})

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const URL = import.meta.env.VITE_API_URL + '/chat'

// const socket = io(URL)
// export default socket
export const socket = io(URL, {
  autoConnect: false,
  withCredentials: true
})

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('message', (...args) => {
  state.fooEvents.push(args)
})

// socket.on("bar", (...args) => {
//   state.barEvents.push(args);
// });
