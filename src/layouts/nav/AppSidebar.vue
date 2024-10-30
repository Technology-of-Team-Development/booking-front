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

type Nav = {
  icon: Component
  title: string
}

const navItems: Nav[] = [
  { title: 'Карта этажа', icon: MapIcon },
  { title: 'Совещания', icon: MeetingIcon },
  { title: 'Сотрудники', icon: EmployeesIcon },
  { title: 'Отчеты', icon: ReportIcon },
  { title: 'Настройки', icon: SettingsIcon },
]

const { open } = useSidebar()
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup class="h-full">
        <SidebarGroupContent class="flex flex-col mt-24">
          <SidebarMenuItem v-for="navItem in navItems" :key="navItem.title">
            <SidebarMenuButton
              size="lg"
              class="text-lg font-bold hover:bg-blue-600 hover:text-white py-8 text-neutral-800"
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
