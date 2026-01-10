<script lang="ts">
definePageMeta({
  middleware: ["admin"],
  layout: "admin",
});
</script>

<template>
  <main class="flex flex-col gap-4 mt-4">
    <div class="flex gap-4 w-full">
      <Card class="flex-1">
        <CardHeader>
          <CardTitle>Active Stargates</CardTitle>
        </CardHeader>
        <CardContent>
          <h1
            class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
          >
            20
          </h1>
        </CardContent>
      </Card>
      <Card class="flex-1">
        <CardHeader>
          <CardTitle>Active MilkyWay Stargates</CardTitle>
        </CardHeader>
        <CardContent>
          <h1
            class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
          >
            20
          </h1>
        </CardContent>
      </Card>
      <Card class="flex-1">
        <CardHeader>
          <CardTitle>Active Pegasus Stargates</CardTitle>
        </CardHeader>
        <CardContent>
          <h1
            class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
          >
            20
          </h1>
        </CardContent>
      </Card>

      <Card class="flex-1">
        <CardHeader>
          <CardTitle>Active Universe Stargates</CardTitle>
        </CardHeader>
        <CardContent>
          <h1
            class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
          >
            20
          </h1>
        </CardContent>
      </Card>

      <Card class="flex-1">
        <CardHeader>
          <CardTitle>Active Dawn Stargates</CardTitle>
        </CardHeader>
        <CardContent>
          <h1
            class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
          >
            20
          </h1>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
