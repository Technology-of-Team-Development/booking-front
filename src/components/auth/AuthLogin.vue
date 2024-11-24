<script setup lang="ts">
import { DialogTitle, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-vue-next'
import { ref } from 'vue'
import { AuthService } from '@/api/auth'
import { useGlobalState } from '@/store/global'
import { useToast } from '@/components/ui/toast'
import { setToken } from '@/lib/utils'

const props = defineProps<{
  closeModal: () => void
}>()

const { toast } = useToast()

const showPassword = ref(false)

const username = ref<string>('')
const password = ref<string>('')

async function login() {
  try {
    const token = await AuthService.login(username.value, password.value)

    setToken(token)

    const userInfoResponse = await AuthService.getUserInfo()

    if (!userInfoResponse) return

    if ('status' in userInfoResponse) {
      toast({
        variant: 'destructive',
        title: 'Ошибка!',
        description: userInfoResponse.errorMessage,
      })
      return
    }

    useGlobalState().setCurrentUser(userInfoResponse)

    props.closeModal()
  } catch (err) {
    if (err instanceof Error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка!',
        description: err.message,
      })
    }
  }

  username.value = ''
  password.value = ''
}
</script>

<template>
  <DialogHeader class="mb-12">
    <DialogTitle class="text-4xl text-center">Войти</DialogTitle>
  </DialogHeader>

  <form action="">
    <Input
      class="bg-neutral-100 mb-16 text-xl"
      placeholder="Введите никнейм"
      type="text"
      v-model="username"
    />

    <div class="flex flex-col mb-16">
      <div class="relative flex mb-4">
        <Input
          class="bg-neutral-100 text-xl"
          placeholder="Введите пароль"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
        />
        <span
          class="absolute right-0 flex items-center h-full pr-2 cursor-pointer"
          @click="() => (showPassword = !showPassword)"
        >
          <Eye v-if="!showPassword" class="text-muted-foreground" />
          <EyeOff v-else class="text-muted-foreground" />
        </span>
      </div>

      <slot />
    </div>
  </form>

  <DialogFooter>
    <Button @click="login" class="w-full text-xl py-8">Войти</Button>
  </DialogFooter>
</template>

<style scoped></style>
