<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import router from '../router/index.js'

const form = ref({
  username: '',
  email: '',
  password: '',
  confirm_password: ''
})

const errors = ref([])

function registerUser() {
  errors.value = []

  form.value.username = form.value.username.trim()
  form.value.email = form.value.email.trim()
  form.value.password = form.value.password.trim()
  form.value.confirm_password = form.value.confirm_password.trim()

  if (!form.value.username) {
    console.log(!form.value.username)
    errors.value.push('Username is invalid')
  }

  if (!form.value.email && !form.value.email.match('^@$')) {
    errors.value.push('Email is invalid')
  }

  if (!form.value.password) {
    errors.value.push('Password is invalid')
  }

  if (errors.value.length == 0) {
    axios.post(import.meta.env.VITE_API_URL + '/auth/register', form.value).then((res) => {
      if (res.status == 201) {
        router.push({ name: 'login' })
      }
    })
  }
}
</script>

<template>
  <div class="h-screen flex justify-center items-center bg-[url('../../coolbg.png')]">
    <div
      class="bg-[#121212] text-neutral-400 rounded-lg sm:w-72 sm:h-auto h-full w-full p-8 border border-[#444444]"
    >
      <h1 class="text-white font-bold text-4xl my-4 text-center">Register</h1>
      <div>
        <p v-for="error in errors" class="text-red-600 text-sm p-2">
          {{ error }}
        </p>
      </div>
      <form @submit.prevent="registerUser">
        <div class="flex flex-col gap-4">
          <div>
            <label for="username" class="text-sm my-1">Username</label>
            <input
              id="username"
              type="text"
              placeholder="John Doe"
              v-model="form.username"
              class="py-1 px-3 w-full rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <div>
            <label for="email" class="text-sm my-1">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="example@example.com"
              v-model="form.email"
              class="py-1 px-3 w-full rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <div>
            <label for="password" class="text-sm my-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              v-model="form.password"
              class="py-1 px-3 w-full rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <div>
            <label for="confirm_password" class="text-sm my-1">Confirm Password</label>
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirm Password"
              v-model="form.confirm_password"
              class="py-1 px-3 w-full rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <button
            type="submit"
            class="bg-emerald-500 hover:bg-white text-white hover:text-black px-2 py-1 rounded-lg mx-auto w-1/2 transition-all my-4"
          >
            Submit
          </button>
        </div>
      </form>
      <p class="text-xs text-center">
        Already have an account?
        <router-link to="/login" class="hover:text-emerald-500">Log in here.</router-link>
      </p>
    </div>
  </div>
</template>

<style>
::-ms-reveal {
  filter: invert(100%);
}
</style>
