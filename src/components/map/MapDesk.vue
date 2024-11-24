<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LeftChairIcon from '@/components/icons/LeftChairIcon.vue'
import RightChairIcon from '@/components/icons/RightChairIcon.vue'
import MapPlace from '@/components/map/MapPlace.vue'

const props = defineProps<{
  active: boolean
  desk: Desk
  bookDate: string
}>()

const chairsRef = ref<HTMLDivElement | null>(null)
const tableHeight = ref<number | null>(null)

const rightPlaces = ref<Place[]>([])
const leftPlaces = ref<Place[]>([])

onMounted(() => {
  props.desk.places.forEach((place, idx) => {
    if (idx <= (props.desk.maxPlaces - 1) / 2) {
      leftPlaces.value.push(place)
    } else {
      rightPlaces.value.push(place)
    }
  })

  tableHeight.value = props.desk.maxPlaces > 2 ? props.desk.maxPlaces * 35 : 0
})
</script>

<template>
  <div
    :class="
      props.desk.vertical
        ? 'flex items-center justify-center space-x-2 rotate-90'
        : 'flex items-center justify-center space-x-2 text-white'
    "
  >
    <!-- Стулья слева -->
    <div class="flex flex-col gap-10" ref="chairsRef">
      <div class="relative flex" v-for="(place, idx) in leftPlaces" :key="idx">
        <MapPlace side="left" :place="place" :book-date="props.bookDate">
          <LeftChairIcon />
        </MapPlace>
      </div>
    </div>

    <!-- Стол -->
    <div
      :style="tableHeight ? `height: ${tableHeight}px` : 'height: 50px'"
      class="w-16 bg-white border-2 border-blue-800 border-opacity-50 rounded-xl"
    ></div>

    <!-- Стулья справа -->
    <div class="flex flex-col gap-10">
      <div class="relative flex" v-for="(place, idx) in rightPlaces" :key="idx">
        <MapPlace side="right" :place="place" :book-date="props.bookDate">
          <RightChairIcon />
        </MapPlace>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
