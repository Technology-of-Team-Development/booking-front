<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LeftChairIcon from '@/components/icons/LeftChairIcon.vue'
import RightChairIcon from '@/components/icons/RightChairIcon.vue'
import { PlaceService } from '@/api/places'
import { useDeskState } from '@/store/desk'
import { useToast } from '@/components/ui/toast'

const props = defineProps<{
  active: boolean
  desk: Desk
}>()

const { toast } = useToast()

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

async function bookPlace(place: Place) {
  const today = new Date()
  today.setDate(today.getDate() + 2)

  const bookDate = today.toISOString().split('T')[0]

  if (!props.active) return

  const result = await PlaceService.book(
    place.placeId,
    bookDate,
    place.placeCode,
  )

  if (!result) return

  if (result.status === 200) {
    await useDeskState().initDesks()
  } else {
    toast({
      variant: 'destructive',
      title: 'Ошибка!',
      description: result.errorMessage,
    })
  }
}
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
        <LeftChairIcon />

        <div
          @click="bookPlace(place)"
          :class="
            !place.booking && props.active
              ? 'absolute cursor-pointer flex justify-center items-center w-8 h-8 rounded-full left-4 bg-chair-free hover:bg-emerald-700'
              : 'absolute cursor-not-allowed flex justify-center items-center w-8 h-8 rounded-full left-4 bg-red-600'
          "
        >
          <span v-if="!place.booking">
            {{ place.placeCode }}
          </span>
          <span v-else>X</span>
        </div>
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
        <RightChairIcon />

        <div
          @click="bookPlace(place)"
          :class="
            !place.booking && props.active
              ? 'absolute cursor-pointer flex justify-center items-center w-8 h-8 rounded-full -left-3 bg-chair-free hover:bg-emerald-700'
              : 'absolute cursor-not-allowed flex justify-center items-center w-8 h-8 rounded-full -left-3 bg-red-600'
          "
        >
          <span v-if="!place.booking">
            {{ place.placeCode }}
          </span>
          <span v-else>X</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
