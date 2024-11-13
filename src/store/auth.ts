import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'
import { useGlobalState } from '@/store/global'

export const useAuthStore = createGlobalState(() => {
  const availableUsers = ref<User[]>([
    {
      fullname: 'Иван Петров',
      email: 'ivan@mail.ru',
      password: 'qwert123',
    },
  ])

  function isUserExist(email: string) {
    return availableUsers.value.findIndex(u => u.email === email)
  }

  function checkUser(email: string, password: string) {
    const response: MyResponse = {
      error: false,
      message: 'Вы успешно вошли!',
    }

    const userIdx = isUserExist(email)
    if (userIdx === -1) {
      response.error = true
      response.message = 'Проверьте правильность почты или пароля'

      return response
    }

    if (availableUsers.value[userIdx].password !== password) {
      response.error = true
      response.message = 'Проверьте правильность почты или пароля'
    } else {
      useGlobalState().setCurrentUser(availableUsers.value[userIdx])
    }

    return response
  }

  function changePassword(email: string, newPass: string) {
    const response: MyResponse = {
      error: false,
      message: 'Вы успешно вошли!',
    }

    const userIdx = isUserExist(email)
    if (userIdx === -1) {
      response.error = true
      response.message = 'Нет пользователя с такой почтой!'

      return response
    }

    availableUsers.value[userIdx].password = newPass
  }

  return { checkUser, changePassword }
})
