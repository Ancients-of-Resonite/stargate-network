<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <div>
    <TooltipProvider>
      <Toaster />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </TooltipProvider>
  </div>
</template>
