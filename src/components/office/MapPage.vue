<script setup lang="ts">
import MapOffice from '@/components/office/MapOffice.vue'
import { useDeskState } from '@/store/desk'
import { computed } from 'vue'
import { useGlobalState } from '@/store/global'

type Place = {
  title: string
  free: boolean
}

type Desk = {
  leftPlaces: Place[]
  rightPlaces: Place[]
  vertical?: boolean
}
const useDesks = useDeskState()

const topDesks: Desk[] = useDesks.getTopDesks()

const bottomDesks: Desk[] = useDesks.getBottomDesks()

const isActive = computed(() => useGlobalState().currentUser.value !== null)
</script>

<template>
  <div
    class="border-8 rounded-2xl border-blue-800 border-opacity-50 flex flex-col gap-32 bg-blue-50"
  >
    <div
      class="flex gap-16 items-baseline py-8 px-6 border-blue-800 border-b-4 border-r-4 w-fit border-opacity-50 relative"
    >
      <div
        class="absolute border-r-8 border-blue-50 w-8 h-12 bottom-2 -right-1"
      ></div>
      <MapOffice
        v-for="(desk, index) in topDesks"
        :key="index"
        :leftPlaces="desk.leftPlaces"
        :rightPlaces="desk.rightPlaces"
        :active="isActive"
      />
    </div>
    <div
      class="flex relative gap-16 items-baseline border-t-4 border-r-4 w-fit border-blue-800 border-opacity-50 pt-12 pb-4 px-6"
    >
      <div class="absolute bg-blue-50 w-10 h-3 -top-2 right-20"></div>
      <MapOffice
        v-for="(desk, index) in bottomDesks"
        :key="index"
        :leftPlaces="desk.leftPlaces"
        :rightPlaces="desk.rightPlaces"
        :active="isActive"
      />
    </div>
  </div>
</template>

<style scoped></style>
