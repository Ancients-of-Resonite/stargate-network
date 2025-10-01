<script setup lang="ts">
const gates = await $fetch("/api/stargates");
</script>

<template>
    <div class="p-4 flex flex-wrap">
        <Card v-for="gate in gates" :key="gate.id" class="m-2 min-w-80 flex-1">
            <CardHeader>
                <CardTitle>
                    <p class="text-lg">{{ gate.session_name }}</p>
                    <p class="font-normal text-sm">{{ gate.owner_name }}</p>
                </CardTitle>
            </CardHeader>
            <CardContent class="space-y-1">
                <div><span class="font-bold">Address</span> {{ gate.gate_address }}<span class="text-accent">{{ gate.gate_code }}</span></div>
                <div><span class="font-bold">Owner</span> {{ gate.gate_address }}</div>
                <div><span class="font-bold">Users</span> {{ gate.active_users }}/{{ gate.max_users }}</div>
                <div><span class="font-bold">Status</span> {{ gate.gate_status }}</div>
            </CardContent>
        </Card>
    </div>
</template>
