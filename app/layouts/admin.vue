<script setup lang="ts">
const { user } = await useAuthUser();
const path = useRoute().path;

import type { User } from "database/prisma/generated/prisma/client";

const data = ref<User[]>([]);

onMounted(async () => {
  data.value = await useFetch("/api/users");
});
</script>

<template>
  <SidebarProvider>
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" as-child>
              <a href="#">
                <div
                  class="flex aspect-square size-8 items-center justify-center"
                >
                  <img src="/images/AoR_Chevron2.png" class="size-6" />
                </div>
                <div class="flex flex-col gap-0.5 leading-none">
                  <span class="font-medium">Stargate Network Admin</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as="a" href="/admin/dashboard">
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton as="a" href="/admin/stargates">
                Stargates
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton as="a" href="/admin/users">
                Users
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <SidebarInset class="p-2">
      <header
        class="flex gap-2 p-2 bg-sidebar rounded-lg border border-sidebar-border"
      >
        <SidebarTrigger />
        {{ path }}
      </header>
      <slot />
    </SidebarInset>
    <div
      class="absolute bottom-1 left-1 right-1 text-center text-3xl text-foreground/50 pointer-events-none font-ancient"
    >
      NOU ANI ANQUIETAS
    </div>
  </SidebarProvider>
</template>
