<script setup lang="ts">
const gates = await $fetch("/api/stargates");
</script>

<template>
  <div class="p-4 flex flex-wrap">
    <ClientOnly>
      <GateListItem v-for="gate in gates" :gate="gate" />
    </ClientOnly>
  </div>
</template>
