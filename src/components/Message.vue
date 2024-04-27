<script setup>
import { useAuthStore } from '@/stores/auth.store'

defineProps({
  content: {
    type: String,
    required: true
  },
  created_at: {
    required: true
  },
  author: {
    required: false
  }
})

const authStore = useAuthStore()
</script>

<template>
  <div class="flex w-full gap-4 px-4 pt-4 pb-2 hover:bg-black/10">
    <div>
      <a href="#" class="rounded-full h-12 w-12 block p-0">
        <img src="../assets/default.jpg" alt="#" class="h-full w-full rounded-full" />
      </a>
    </div>
    <div class="flex flex-col">
      <div class="flex gap-2 items-center">
        <a href="#" class="text-white hover:underline hover:bg-transparent p-0">{{
          author ? author?.username : 'Deleted User'
        }}</a>
        <span class="text-xs text-neutral-300">{{
          new Date(created_at).toLocaleTimeString([], {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit'
          })
        }}</span>
      </div>
      <p class="text-neutral-300">
        {{ content }}
      </p>
    </div>
  </div>
</template>
