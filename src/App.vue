<script setup lang="ts">
import DefaultLayout from '@/layouts/defaultLayout.vue'
import { AuthService } from '@/api/auth'
import { useGlobalState } from '@/store/global'
import { onMounted } from 'vue'
import { Toaster, useToast } from '@/components/ui/toast'

const { toast } = useToast()

async function getUserInfoHandler() {
  try {
    const result = await AuthService.getUserInfo()
    if (!result) {
      return
    }

    if ('status' in result) {
      toast({
        variant: 'destructive',
        title: 'Ошибка!',
        description: result.errorMessage,
      })
      return
    }

    useGlobalState().setCurrentUser(result)
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => await getUserInfoHandler())
</script>

<template>
  <Toaster />
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<style scoped></style>
