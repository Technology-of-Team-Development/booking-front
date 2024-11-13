<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import AuthLogin from '@/components/auth/AuthLogin.vue'
import { DialogTrigger } from '@/components/ui/dialog'
import { useGlobalState } from '@/store/global'

const date = new Date()
const options: Intl.DateTimeFormatOptions = {
  timeZone: 'Asia/Bishkek',
  month: 'long',
}

const month = date.toLocaleString('ru-Ru', options)
const year = date.getFullYear()

const globalState = useGlobalState()

const user = globalState.currentUser
</script>

<template>
  <header
    class="px-8 py-4 border-b border-gray-200 flex items-center justify-between text-2xl font-bold"
  >
    <span class="capitalize text-4xl">
      {{ month }}
      {{ year }}
    </span>
    <div class="flex gap-6 items-center">
      <div
        class="bg-neutral-200 p-2 rounded-full cursor-pointer hover:text-white hover:bg-black"
      >
        <Bell />
      </div>

      <div v-if="user">
        <span>{{ user.fullname }}</span>
      </div>
      <AuthLogin v-else>
        <DialogTrigger>
          <button class="hover:text-neutral-600">Войти</button>
        </DialogTrigger>
      </AuthLogin>
    </div>
  </header>
</template>

<style scoped></style>
