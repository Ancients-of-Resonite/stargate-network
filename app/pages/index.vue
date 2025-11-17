<script setup lang="ts">
useHead({
    title: "AoR - Active Stargates",
});
const { data: gates } = await useFetch("/api/stargates");
</script>

<template>
    <UserDropdown />
    <div class="p-4 flex flex-wrap">
        <GateListItem v-for="gate in gates" :gate="gate" />
    </div>
</template>
