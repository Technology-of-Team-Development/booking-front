<script setup lang="ts">
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast'
import { AuthService } from '@/api/auth'

const props = defineProps<{
  changeAuthState: () => void
}>()

const { toast } = useToast()

const isEmailConfirmed = ref<boolean>(false)

const email = ref<string>('')

const verificationCode = ref<string>('')

const password = ref<string>('')
const confirmedPassword = ref<string>('')

const showPassword = ref<boolean>(false)
const showConfirmedPassword = ref<boolean>(false)

async function resetPassword() {
  const result = await AuthService.resetPass(email.value)

  if (result.status != 200) {
    toast({
      variant: 'destructive',
      title: 'Ошибка!',
      description: result.errorMessage,
    })

    return
  }

  toast({
    title: 'Успех!',
    description: result.message,
  })

  isEmailConfirmed.value = true
}

async function recoverPassword() {
  const result = await AuthService.recoverPass(
    verificationCode.value,
    password.value,
    confirmedPassword.value,
  )

  if (result.status != 200) {
    toast({
      variant: 'destructive',
      title: 'Ошибка!',
      description: result.errorMessage,
    })

    return
  }

  toast({
    title: 'Успех!',
    description: 'Пароль успешно восстановлен',
  })

  props.changeAuthState()
}
</script>

<template>
  <DialogHeader class="mb-12">
    <DialogTitle class="text-4xl text-center">Восстановить пароль</DialogTitle>
  </DialogHeader>

  <form action="" v-if="!isEmailConfirmed">
    <Input
      class="bg-neutral-100 mb-16 text-xl"
      placeholder="Введите почту"
      type="text"
      v-model="email"
    />
  </form>

  <form v-else>
    <Input
      class="bg-neutral-100 mb-16 text-xl"
      placeholder="Введите код подтверждения"
      type="text"
      v-model="verificationCode"
    />
    <div class="relative flex mb-4">
      <Input
        class="bg-neutral-100 text-xl"
        placeholder="Введите новый пароль"
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
    <div class="relative flex mb-4">
      <Input
        class="bg-neutral-100 text-xl"
        placeholder="Введите новый пароль"
        :type="showConfirmedPassword ? 'text' : 'password'"
        v-model="confirmedPassword"
      />
      <span
        class="absolute right-0 flex items-center h-full pr-2 cursor-pointer"
        @click="() => (showConfirmedPassword = !showConfirmedPassword)"
      >
        <Eye v-if="!showConfirmedPassword" class="text-muted-foreground" />
        <EyeOff v-else class="text-muted-foreground" />
      </span>
    </div>
  </form>

  <DialogFooter>
    <slot />
    <Button
      v-if="!isEmailConfirmed"
      @click="resetPassword"
      class="w-full text-xl py-8"
    >
      Далее
    </Button>
    <Button v-else @click="recoverPassword" class="w-full text-xl py-8">
      Восстановить пароль
    </Button>
  </DialogFooter>
</template>

<style scoped></style>
