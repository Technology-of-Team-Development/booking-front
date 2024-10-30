<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-vue-next'
import { ref } from 'vue'

const showPassword = ref(false)
</script>

<template>
  <Dialog>
    <slot />
    <DialogContent>
      <DialogHeader class="mb-12">
        <DialogTitle class="text-4xl text-center">Войти</DialogTitle>
      </DialogHeader>

      <form action="">
        <Input
          class="bg-neutral-100 mb-16 text-xl"
          placeholder="Введите почту"
          type="text"
        />
        <div class="relative flex mb-16">
          <Input
            class="bg-neutral-100 text-xl"
            placeholder="Введите пароль"
            :type="showPassword ? 'text' : 'password'"
          />
          <span
            class="absolute right-0 flex items-center h-full pr-2 cursor-pointer"
            @click="() => (showPassword = !showPassword)"
          >
            <Eye v-if="!showPassword" class="text-muted-foreground" />
            <EyeOff v-else class="text-muted-foreground" />
          </span>
        </div>
      </form>
      <DialogFooter>
        <Button class="w-full text-xl py-8">Войти</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
