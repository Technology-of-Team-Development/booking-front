<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LeftChairIcon from '@/components/icons/LeftChairIcon.vue'
import RightChairIcon from '@/components/icons/RightChairIcon.vue'
import { useDeskState } from '@/store/desk'

const props = defineProps<{
  active: boolean
  leftPlaces: { title: string; free: boolean }[]
  rightPlaces: { title: string; free: boolean }[]
  vertical?: boolean
}>()

const chairsRef = ref<HTMLDivElement | null>(null)
const tableHeight = ref<number | null>(null)

onMounted(() => {
  if (chairsRef.value) {
    tableHeight.value = chairsRef.value.getBoundingClientRect().height
  }
})

const deskStore = useDeskState()

function bookPlace(title: string) {
  if (!props.active) return

  deskStore.bookPlace(title)
}
</script>

<template>
  <div
    :class="
      props.vertical
        ? 'flex items-center justify-center space-x-2 rotate-90'
        : 'flex items-center justify-center space-x-2 text-white'
    "
  >
    <!-- Стулья слева -->
    <div class="flex flex-col gap-6" ref="chairsRef">
      <div
        class="relative flex"
        v-for="(place, idx) in props.leftPlaces"
        :key="idx"
      >
        <LeftChairIcon />

        <div
          @click="bookPlace(place.title)"
          :class="
            place.free && props.active
              ? 'absolute cursor-pointer flex justify-center items-center w-8 h-8 rounded-full left-4 bg-chair-free hover:bg-emerald-700'
              : 'absolute cursor-not-allowed flex justify-center items-center w-8 h-8 rounded-full left-4 bg-red-600'
          "
        >
          <span v-if="place.free">
            {{ place.title }}
          </span>
          <span v-else>X</span>
        </div>
      </div>
    </div>

    <!-- Стол -->
    <div
      :style="tableHeight ? `height: ${tableHeight + 50}px` : 'height: 50px'"
      class="w-16 bg-white border-2 border-blue-800 border-opacity-50 rounded-xl"
    ></div>

    <!-- Стулья справа -->
    <div class="flex flex-col gap-6">
      <div
        class="relative flex"
        v-for="(place, idx) in props.rightPlaces"
        :key="idx"
      >
        <RightChairIcon />

        <div
          @click="bookPlace(place.title)"
          :class="
            place.free && props.active
              ? 'absolute cursor-pointer flex justify-center items-center w-8 h-8 rounded-full left-4 bg-chair-free hover:bg-emerald-700'
              : 'absolute cursor-not-allowed flex justify-center items-center w-8 h-8 rounded-full left-4 bg-red-600'
          "
        >
          <span v-if="place.free">
            {{ place.title }}
          </span>
          <span v-else>X</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
