<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { removeToken } from '@/lib/utils'
import { ref } from 'vue'
import { useGlobalState } from '@/store/global'

const props = defineProps<{
  user: User
}>()

const open = ref<boolean>(false)

const profileInfo = [
  { name: 'Фамилия', value: props.user.lastName },
  { name: 'Имя', value: props.user.firstName },
  { name: 'Отчество', value: props.user.middleName },
  { name: 'Должность', value: props.user.position },
  { name: 'Команда', value: props.user.team },
]

function logout() {
  removeToken()
  useGlobalState().removeCurrentUser()

  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <slot />
    <DialogContent>
      <DialogHeader class="mb-12 flex items-center">
        <DialogTitle class="text-2xl">{{
          props.user.firstName + ' ' + props.user.lastName
        }}</DialogTitle>

        <DialogDescription>
          {{ props.user.email }}
        </DialogDescription>
      </DialogHeader>

      <Tabs default-value="profile">
        <TabsList class="w-full justify-between">
          <TabsTrigger class="text-xl" value="profile">Профиль</TabsTrigger>
          <TabsTrigger class="text-xl" value="booking">
            Бронирование
          </TabsTrigger>
          <TabsTrigger class="text-xl" value="statistics">Статиска</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ul class="shadow p-4 rounded-lg flex flex-col gap-6">
            <li v-for="(item, idx) in profileInfo" :key="idx">
              <p>{{ item.name }}</p>
              <span>{{ item.value }}</span>
            </li>
          </ul>
        </TabsContent>
      </Tabs>

      <DialogFooter>
        <Button
          @click="logout"
          class="w-full bg-red-600 text-xl py-8 hover:bg-red-800"
          >Выйти</Button
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
