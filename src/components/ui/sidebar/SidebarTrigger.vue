<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { cn } from '@/lib/utils'
import { ChevronRight, ChevronLeft } from 'lucide-vue-next'
import { useSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  open: boolean
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar"
  >
    <ChevronRight v-if="open" />
    <ChevronLeft v-else />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
