<script setup>
import { socket } from '../socket.js'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store.js'

const content = ref('')

const modal = ref(false)

const authStore = useAuthStore()

function handleEmojiPick(emoji) {
  content.value ? (content.value += emoji.i) : (content.value = emoji.i)
}

function sendMessage(e) {
  if ((e.keyCode === 13 && !e.shiftKey) || e.type == 'click') {
    e.preventDefault()

    if (content.value.trim() != '' && content.value != '') {
      // console.log(content.value)
      let message = content.value.trim()
      let from = authStore.user
      const { email, ...author } = from
      // console.log(author)
      socket.emit('message', {
        data: { content: message, author: author }
      })
      content.value = ''
    }
  }
}
</script>
<template>
  <div class="w-full p-4 bg-[#121212] flex gap-4 relative">
    <textarea
      name="msg"
      id="msg"
      class="py-2 px-4 w-full rounded-lg border border-[#444444] bg-transparent resize-none break-words block outline-none focus:border-white transition-all text-white placeholder-neutral-600"
      rows="1"
      placeholder="Write a message"
      v-model="content"
      v-on:keydown="sendMessage"
    ></textarea>
    <ul class="flex justify-center items-center gap-2">
      <li class="flex items-center">
        <button
          type="button"
          class="text-[#666666] hover:text-[#F3BF03] focus:text-[#F3BF03] w-8 h-8 hover:scale-110 focus:scale-110 transition-all"
          v-on:click="modal = !modal"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM9 10.5C9.82843 10.5 10.5 9.82843 10.5 9C10.5 8.17157 9.82843 7.5 9 7.5C8.17157 7.5 7.5 8.17157 7.5 9C7.5 9.82843 8.17157 10.5 9 10.5ZM7.39992 14.2001C7.84036 13.8697 8.4646 13.9577 8.79678 14.3959L8.80142 14.4018C8.80737 14.4093 8.81869 14.4234 8.83523 14.4431C8.86838 14.4826 8.92211 14.5442 8.99535 14.6207C9.14264 14.7744 9.36399 14.9829 9.65059 15.1913C10.2277 15.611 11.0254 16.0001 11.9999 16.0001C12.9744 16.0001 13.7722 15.611 14.3492 15.1913C14.6359 14.9829 14.8572 14.7744 15.0045 14.6207C15.0777 14.5442 15.1315 14.4826 15.1646 14.4431C15.1812 14.4234 15.1925 14.4093 15.1984 14.4018L15.2031 14.3959C15.5352 13.9577 16.1595 13.8697 16.5999 14.2001C17.0417 14.5314 17.1313 15.1582 16.7999 15.6001L16.7989 15.6014C16.6918 15.7435 16.5714 15.8762 16.4485 16.0045C16.2364 16.2258 15.9265 16.5172 15.5256 16.8088C14.7277 17.3891 13.5254 18.0001 11.9999 18.0001C10.4744 18.0001 9.27219 17.3891 8.47425 16.8088C8.07335 16.5172 7.76344 16.2258 7.55137 16.0045C7.42882 15.8766 7.30914 15.7443 7.20208 15.6029C6.87354 15.1664 6.96219 14.5284 7.39992 14.2001ZM16.5 9C16.5 9.82843 15.8284 10.5 15 10.5C14.1716 10.5 13.5 9.82843 13.5 9C13.5 8.17157 14.1716 7.5 15 7.5C15.8284 7.5 16.5 8.17157 16.5 9Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <Transition>
          <div v-show="modal" class="absolute bottom-20 right-4">
            <EmojiPicker :native="true" @select="handleEmojiPick" theme="dark" />
          </div>
        </Transition>
      </li>
      <li class="sm:hidden flex items-center">
        <button
          v-on:click="sendMessage"
          class="text-[#666666] hover:text-white focus:text-white w-8 h-8 hover:scale-110 focus:scale-110 transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.36328 12.0523C4.01081 11.5711 3.33457 11.3304 3.13309 10.9655C2.95849 10.6492 2.95032 10.2673 3.11124 9.94388C3.29694 9.57063 3.96228 9.30132 5.29295 8.76272L17.8356 3.68594C19.1461 3.15547 19.8014 2.89024 20.2154 3.02623C20.5747 3.14427 20.8565 3.42608 20.9746 3.7854C21.1106 4.19937 20.8453 4.85465 20.3149 6.16521L15.2381 18.7078C14.6995 20.0385 14.4302 20.7039 14.0569 20.8896C13.7335 21.0505 13.3516 21.0423 13.0353 20.8677C12.6704 20.6662 12.4297 19.99 11.9485 18.6375L10.4751 14.4967C10.3815 14.2336 10.3347 14.102 10.2582 13.9922C10.1905 13.8948 10.106 13.8103 10.0086 13.7426C9.89876 13.6661 9.76719 13.6193 9.50407 13.5257L5.36328 12.0523Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<style>
.v3-color-theme-dark {
  --v3-picker-bg: #121212 !important;
}
</style>
