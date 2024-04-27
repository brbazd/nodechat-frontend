<script setup>
import { ref } from 'vue'
import router from '../router/index.js'
// import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
// import { Form, Field, ErrorMessage } from 'vee-validate'

const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

function loginUser() {
  //   username.value = username.value.trim()
  //   email.value = email.value.trim()
  //   password.value = password.value.trim()
  //   confirm_password.value = confirm_password.value.trim()

  const { email, password } = form.value

  return authStore.login(email, password)
}
</script>

<template>
  <div class="h-screen flex justify-center items-center bg-[url('../../coolbg.png')]">
    <div
      class="bg-[#121212] text-neutral-400 rounded-lg sm:w-72 sm:h-auto h-full w-full p-8 border border-[#444444]"
    >
      <h1 class="font-bold text-4xl text-white py-4 text-center">Login</h1>
      <form @submit.prevent="loginUser">
        <div class="flex flex-col gap-2">
          <div>
            <label for="email" class="text-sm my-1">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="example@example.com"
              v-model="form.email"
              class="py-1 px-3 w-full rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <div>
            <label for="password" class="text-sm my-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              v-model="form.password"
              class="py-1 px-3 w-full rounded-lg border border-[#444444] bg-transparent block outline-none focus:border-white placeholder-neutral-600 transition-all text-white"
            />
          </div>
          <button
            type="submit"
            class="bg-emerald-500 hover:bg-white text-white hover:text-black px-2 py-1 rounded-lg mx-auto w-1/2 transition-all my-4"
          >
            Log in
          </button>
        </div>
      </form>
      <p class="text-xs text-center">
        Don't have an account?
        <router-link to="/register" class="hover:text-emerald-500">Register here.</router-link>
      </p>
    </div>
  </div>
</template>

<style>
::-ms-reveal {
  filter: invert(100%);
}
</style>
