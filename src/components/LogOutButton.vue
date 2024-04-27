<script setup>
import { useAuthStore } from '../stores/auth.store'

const authStore = useAuthStore()

function logout() {
  return authStore.logout()
}
</script>
<template>
  <div>
    <form action="post" @submit.prevent="logout">
      <button
        class="w-full hover:bg-black/10 px-4 py-4 transition-all text-left text-xl font-semibold"
      >
        Logout
      </button>
    </form>
  </div>
</template>
