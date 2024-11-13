<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/layouts/nav/AppSidebar.vue'
import Header from '@/components/AppHeader.vue'
</script>

<template>
  <SidebarProvider :default-open="false">
    <AppSidebar />
    <div class="flex flex-col flex-grow">
      <Header />
      <main class="bg-neutral-200 flex-1">
        <div class="px-4 py-6">
          <slot />
        </div>
      </main>
    </div>
  </SidebarProvider>
</template>

<style scoped></style>
