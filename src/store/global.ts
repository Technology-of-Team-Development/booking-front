import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useGlobalState = createGlobalState(() => {
  const currentUser = ref<User | null>(null)

  function setCurrentUser(user: User) {
    currentUser.value = user
  }

  return {
    currentUser,
    setCurrentUser,
  }
})
