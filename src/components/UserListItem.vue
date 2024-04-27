<script setup>
defineProps({
  user: {
    required: true
  }
})
</script>

<template>
  <div>
    <a href="#" class="flex items-center gap-4 w-full hover:bg-black/10 px-4 py-2 transition-all">
      <img src="../assets/default.jpg" alt="#" class="h-8 w-8 rounded-full" />
      <span>{{ user.username }}</span>
    </a>
  </div>
</template>
