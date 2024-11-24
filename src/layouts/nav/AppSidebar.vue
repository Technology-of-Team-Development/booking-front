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
  name: 'map' | 'report' | 'employee' | 'meeting' | 'settings'
  path: string
}

const navItems: Nav[] = [
  { title: 'Карта этажа', icon: MapIcon, name: 'map', path: '/' },
  { title: 'Совещания', icon: MeetingIcon, name: 'meeting', path: 'meetings' },
  {
    title: 'Сотрудники',
    icon: EmployeesIcon,
    name: 'employee',
    path: 'employees',
  },
  { title: 'Отчеты', icon: ReportIcon, name: 'report', path: 'report' },
  {
    title: 'Настройки',
    icon: SettingsIcon,
    name: 'settings',
    path: 'settings',
  },
]

const { open } = useSidebar()
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup class="h-full">
        <SidebarGroupContent class="flex flex-col gap-4 mt-24">
          <SidebarMenuItem v-for="navItem in navItems" :key="navItem.title">
            <RouterLink :to="navItem.path">
              <SidebarMenuButton
                size="lg"
                class="text-lg font-bold hover:bg-blue-600 hover:text-white py-8 text-neutral-800"
              >
                <component :is="navItem.icon" class="hover:text-white" />

                <span>
                  {{ navItem.title }}
                </span>
              </SidebarMenuButton>
            </RouterLink>
          </SidebarMenuItem>
        </SidebarGroupContent>
        <div class="flex-grow justify-end flex items-center">
          <SidebarTrigger :open="open" />
        </div>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<style scoped>
a.router-link-exact-active {
  background-color: blue;
  color: white;
}
</style>
