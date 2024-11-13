<script setup lang="ts">
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'

const email = ref<string>('')
</script>

<template>
  <DialogContent>
    <DialogHeader class="mb-12">
      <DialogTitle class="text-4xl text-center"
        >Восстановить пароль</DialogTitle
      >
    </DialogHeader>

    <form action="">
      <Input
        class="bg-neutral-100 mb-16 text-xl"
        placeholder="Введите почту"
        type="text"
        v-model="email"
      />
    </form>
  </DialogContent>
</template>

<style scoped></style>
