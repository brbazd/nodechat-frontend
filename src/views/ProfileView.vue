<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form_username = ref({
  username: '',
  password: ''
})

const form_password = ref({
  old_password: '',
  new_password: '',
  confirm_password: ''
})

function changeUsername() {
  axios
    .post(import.meta.env.VITE_API_URL + '/users/change_username', form_username.value)
    .then((res) => {
      console.log(res)
    })
}

function changePassword() {
  axios
    .post(import.meta.env.VITE_API_URL + '/users/change_password', form_password.value)
    .then((res) => {
      console.log(res)
    })
}
</script>

<template>
  <div class="h-screen bg-[#1a1a1a]">
    <div class="h-24 bg-[#121212] border-b border-[#444444] mb-12">
      <div class="max-w-screen-xl mx-auto h-full flex items-center justify-between">
        <h2 class="text-neutral-300 p-4 text-4xl font-semibold">Profile</h2>
        <router-link to="/" class="text-neutral-300 text-lg flex justify-center items-center mr-4">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 12H18M6 12L11 7M6 12L11 17"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="hidden sm:block"> Back to homepage </span>
        </router-link>
      </div>
    </div>
    <div class="max-w-screen-xl mx-auto">
      <div class="sm:border border-t border-b border-[#444444] sm:rounded-lg bg-[#121212] p-8 my-4">
        <h3 class="text-neutral-300 text-2xl font-semibold pb-2">Change username</h3>
        <form @submit.prevent="changeUsername">
          <div>
            <label for="username" class="text-sm my-1">New username</label>
            <input
              id="username"
              type="text"
              placeholder="New username"
              v-model="form_username.username"
              class="py-1 px-3 rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <div>
            <label for="password" class="text-sm my-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              v-model="form_username.password"
              class="py-1 px-3 rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <button
            type="submit"
            class="bg-emerald-500 hover:bg-white text-white hover:text-black px-2 py-1 rounded-lg mx-auto transition-all my-4"
          >
            Submit
          </button>
        </form>
      </div>
      <div class="sm:border border-t border-b border-[#444444] sm:rounded-lg bg-[#121212] p-8 my-4">
        <h3 class="text-neutral-300 text-2xl font-semibold pb-2">Change password</h3>
        <form @submit.prevent="changePassword">
          <div>
            <label for="old_password" class="text-sm my-1">Old password</label>
            <input
              id="old_password"
              type="password"
              placeholder="Old Password"
              v-model="form_password.old_password"
              class="py-1 px-3 rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <div>
            <label for="new_password" class="text-sm my-1">New Password</label>
            <input
              id="new_password"
              type="password"
              placeholder="New Password"
              v-model="form_password.new_password"
              class="py-1 px-3 rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <div>
            <label for="confirm_password" class="text-sm my-1">Confirm Password</label>
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirm Password"
              v-model="form_password.confirm_password"
              class="py-1 px-3 rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <button
            type="submit"
            class="bg-emerald-500 hover:bg-white text-white hover:text-black px-2 py-1 rounded-lg mx-auto transition-all my-4"
          >
            Submit
          </button>
        </form>
      </div>
      <div></div>
    </div>
  </div>
</template>
