import { defineStore } from 'pinia'

export const useSidebarStore = defineStore({
  id: 'sidebar',
  state: () => ({
    open: false
  }),
  actions: {
    toggleSidebar() {
      this.open = !this.open
    }
  }
})
