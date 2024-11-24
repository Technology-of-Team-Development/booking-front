<script setup lang="ts">
import { Dialog, DialogContent } from '@/components/ui/dialog'
import AuthLogin from '@/components/auth/AuthLogin.vue'
import AuthRecoverPass from '@/components/auth/AuthRecoverPass.vue'
import { Button } from '@/components/ui/button'
import { useGlobalState } from '@/store/global'

const open = useGlobalState().isAuthModalOpen
const isLogin = useGlobalState().isAuthLogin

function changeAuthState() {
  isLogin.value = !isLogin.value
}

function closeAuthModal() {
  open.value = !open.value
}
</script>

<template>
  <Dialog v-model:open="open">
    <slot />

    <DialogContent>
      <AuthLogin :closeModal="closeAuthModal" v-if="isLogin">
        <button @click="changeAuthState" class="self-end">
          Забыли пароль?
        </button>
      </AuthLogin>

      <AuthRecoverPass v-else :changeAuthState="changeAuthState">
        <Button @click="changeAuthState" class="w-full text-lg py-8">
          Отмена
        </Button>
      </AuthRecoverPass>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
