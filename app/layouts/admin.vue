<script setup lang="ts">
const { user } = await useAuthUser();
</script>

<template>
  <SidebarProvider>
    <Sidebar variant="floating">
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
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <SidebarInset class="bg-transparent p-2">
      <header class="flex gap-2 p-2 bg-sidebar border-sidebar rounded-lg">
        <SidebarTrigger />
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

<style>
body {
  background: url("/images/background.png") no-repeat center center fixed;
  background-size: cover;
}
</style>
