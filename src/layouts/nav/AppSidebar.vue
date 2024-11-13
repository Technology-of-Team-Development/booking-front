<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import type { Component } from 'vue'
import MapIcon from '@/components/icons/MapIcon.vue'
import MeetingIcon from '@/components/icons/MeetingIcon.vue'
import EmployeesIcon from '@/components/icons/EmployeesIcon.vue'
import ReportIcon from '@/components/icons/ReportIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import { useGlobalState } from '@/store/global'

type Nav = {
  icon: Component
  title: string
  name: 'map' | 'report' | 'employee' | 'meeting' | 'settings'
}

const navItems: Nav[] = [
  { title: 'Карта этажа', icon: MapIcon, name: 'map' },
  { title: 'Совещания', icon: MeetingIcon, name: 'meeting' },
  { title: 'Сотрудники', icon: EmployeesIcon, name: 'employee' },
  { title: 'Отчеты', icon: ReportIcon, name: 'report' },
  { title: 'Настройки', icon: SettingsIcon, name: 'settings' },
]

const { open } = useSidebar()

const currentPage = useGlobalState().currentPage

function changePage(
  newPage: 'map' | 'report' | 'employee' | 'meeting' | 'settings',
) {
  useGlobalState().changePage(newPage)
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup class="h-full">
        <SidebarGroupContent class="flex flex-col gap-4 mt-24">
          <SidebarMenuItem v-for="navItem in navItems" :key="navItem.title">
            <SidebarMenuButton
              @click="changePage(navItem.name)"
              size="lg"
              :class="
                navItem.name === currentPage
                  ? 'text-lg font-bold bg-blue-600 text-white py-8 '
                  : 'text-lg font-bold hover:bg-blue-600 hover:text-white py-8 text-neutral-800'
              "
            >
              <component :is="navItem.icon" class="hover:text-white" />
              <span>{{ navItem.title }}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>
        <div class="flex-grow justify-end flex items-center">
          <SidebarTrigger :open="open" />
        </div>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<style scoped></style>
