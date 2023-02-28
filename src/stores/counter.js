import { ref, computed,reactive } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('counter', () => {
  const count = ref(0)
  const isAuthenticated = ref(false)
  const authToken = ref('')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment,isAuthenticated,authToken }
})
