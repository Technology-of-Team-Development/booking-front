<script setup lang="ts">
import DefaultLayout from '@/layouts/defaultLayout.vue'
import MapPage from '@/components/office/MapPage.vue'
import { useGlobalState } from '@/store/global'

const currentPage = useGlobalState().currentPage
</script>

<template>
  <DefaultLayout>
    <MapPage />
  </DefaultLayout>
</template>

<style scoped></style>
