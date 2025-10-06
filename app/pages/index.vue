<script setup lang="ts">
useHead({
  title: "AoR - Active Stargates",
});
const { data: gates } = await useFetch("/api/stargates");
</script>

<template>
  <div class="p-4 flex flex-wrap">
    <ClientOnly>
      <GateListItem v-for="gate in gates" :gate="gate" />
    </ClientOnly>
  </div>
</template>
