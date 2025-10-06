<script setup lang="ts">
import { useStorage } from "@vueuse/core";
const glyph_display = useStorage("glyph_display", "text", localStorage, {
  mergeDefaults: true,
});

const props = defineProps<{
  gate: any;
}>();
</script>

<template>
  <Card class="m-2 min-w-80 flex-1">
    <CardHeader>
      <CardTitle>
        <div class="flex gap-2 items-center">
          <Icon
            :name="gate.is_headless ? 'tabler:server' : 'tabler:user'"
            size="22"
          />
          <p class="text-lg">{{ gate.session_name }}</p>
        </div>
        <p class="font-normal text-sm">{{ gate.owner_name }}</p>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div>
        <div class="flex justify-between">
          <span class="font-bold">Address</span>
          <span
            :class="{
              'font-mono': glyph_display == 'text',
              'font-mw': glyph_display == 'mw',
              'font-pg': glyph_display == 'pg',
              'font-uni': glyph_display == 'uni',
            }"
            >{{ gate.gate_address
            }}<span class="text-primary">{{ gate.gate_code }}</span></span
          >
        </div>
        <Separator />
        <div class="flex justify-between">
          <span class="font-bold">Owner</span> {{ gate.gate_address }}
        </div>
        <Separator />
        <div class="flex justify-between">
          <span class="font-bold">Users</span>
          <span>{{ gate.active_users }}/{{ gate.max_users }}</span>
        </div>
        <Separator />
        <div class="flex justify-between">
          <span class="font-bold">Status</span> {{ gate.gate_status }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>
