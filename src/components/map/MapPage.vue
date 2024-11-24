<script setup lang="ts">
import MapOffice from '@/components/map/MapOffice.vue'
import { useDeskState } from '@/store/desk'
import { computed, onMounted, ref } from 'vue'
import { useGlobalState } from '@/store/global'
import { AuthService } from '@/api/auth'
import { PlaceService } from '@/api/places'
import { useToast } from '@/components/ui/toast'
import CircleIcon from '@/components/icons/CircleIcon.vue'

// type Place = {
//   title: string
//   free: boolean
// }
//
// type Desk = {
//   leftPlaces: Place[]
//   rightPlaces: Place[]
//   vertical?: boolean
// }

const { toast } = useToast()

const useDesks = useDeskState()

const topDesks = ref<Desk[]>([])

const bottomDesks = ref<Desk[]>([])

const isActive = computed(() => useGlobalState().currentUser.value !== null)

async function handleGetAllPlaces() {
  await useDeskState().initDesks()

  topDesks.value = useDesks.getTopDesks()
  bottomDesks.value = useDesks.getBottomDesks()
}

async function getUserInfoHandler() {
  try {
    const result = await AuthService.getUserInfo()

    console.log(result)
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

// onMounted(async () => await getUserInfoHandler())

onMounted(async () => await handleGetAllPlaces())
</script>

<template>
  <div
    class="border-8 rounded-2xl border-blue-800 border-opacity-50 flex flex-col justify-between gap-32 bg-blue-50 overflow-x-auto max-w-[100dvw] h-full"
  >
    <div
      v-if="!topDesks.length"
      class="flex justify-center items-center h-full bg-neutral-200"
    >
      <CircleIcon class="animate-spin w-24 h-24 text-blue-800" />
    </div>
    <template v-else>
      <div
        class="flex gap-16 items-baseline py-8 px-6 border-blue-800 border-b-4 border-r-4 w-fit border-opacity-50 relative"
      >
        <div
          class="absolute border-r-8 border-blue-50 w-8 h-12 bottom-2 -right-1"
        ></div>
        <MapOffice
          v-for="(desk, idx) in topDesks"
          :key="idx"
          :active="isActive"
          :desk="desk"
        />
      </div>

      <div
        class="flex relative gap-16 items-baseline border-t-4 border-r-4 w-fit border-blue-800 border-opacity-40 pt-12 pb-4 px-6"
      >
        <div class="absolute bg-blue-50 w-10 h-3 -top-2 right-20"></div>
        <MapOffice
          v-for="(desk, idx) in bottomDesks"
          :key="idx"
          :active="isActive"
          :desk="desk"
        />
      </div>
    </template>
  </div>
</template>

<style scoped></style>
