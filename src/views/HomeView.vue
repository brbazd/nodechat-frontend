<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import axios from 'axios'
import Message from '../components/Message.vue'
import MessageSmall from '../components/MessageSmall.vue'
import TextBox from '../components/TextBox.vue'
import { socket } from '../socket.js'
import { computed, ref, onMounted } from 'vue'
import CurrentUserInfo from '../components/CurrentUserInfo.vue'
import LogOutButton from '../components/LogOutButton.vue'
import UserListItem from '../components/UserListItem.vue'
import { useSidebarStore } from '../stores/sidebar.store.js'

const users = ref({})

axios.get('http://localhost:3000/users').then((res) => {
  if (res.status == 200) {
    users.value = res.data
    console.log(users)
  }
})

const conversation = ref([])

axios.get('http://localhost:3000/messages').then((res) => {
  conversation.value = res.data
})

socket.on('message', ({ data }) => {
  console.log(data)
  let message = data
  conversation.value.push(message)
  console.log(conversation.value)
})

socket.on('connected', ({ data }) => {
  console.log(data)
})

const sidebarStore = useSidebarStore()
</script>

<template>
  <div class="flex h-screen bg-[#1a1a1a] text-[#9CA3AF] justify-between relative">
    <nav class="w-[320px] bg-[#121212] h-screen sm:flex flex-col justify-between hidden">
      <div>
        <CurrentUserInfo></CurrentUserInfo>
        <span class="p-4 text-md font-semibold">List of Users</span>
        <ul class="w-full overflow-y-scroll">
          <li v-for="user in users">
            <UserListItem :user="user"></UserListItem>
          </li>
        </ul>
      </div>
      <LogOutButton></LogOutButton>
    </nav>
    <div class="absolute right-4 top-4 z-50">
      <button v-on:click="sidebarStore.toggleSidebar()" class="w-6 h-6 text-neutral-300 sm:hidden">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 6H20M4 12H20M4 18H20"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <nav
      class="sm:hidden w-full bg-[#121212] h-screen absolute flex flex-col justify-between z-40 pt-8"
      :class="{ hidden: !sidebarStore.open }"
    >
      <div>
        <CurrentUserInfo></CurrentUserInfo>
        <span class="p-4 text-md font-semibold">List of Users</span>
        <ul class="w-full overflow-y-scroll">
          <li v-for="user in users">
            <UserListItem :user="user"></UserListItem>
          </li>
        </ul>
      </div>
      <LogOutButton></LogOutButton>
    </nav>
    <main class="flex flex-col justify-between h-full w-full">
      <div class="h-full py-4 overflow-y-scroll">
        <ul>
          <li v-for="message in conversation">
            <Message
              :content="message.content"
              :created_at="message.created_at"
              :author="message.author"
            />
          </li>
        </ul>
      </div>

      <TextBox />
    </main>
  </div>
</template>

<style>
::-webkit-scrollbar {
  width: 12px;
  background-color: #141414;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* background-color: rgba(0,0,0,.5); */
  background-color: #101010;
  color: #101010;
  border: 2px solid #141414;
  /* -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5); */
}
</style>
