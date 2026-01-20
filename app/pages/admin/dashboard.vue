<script setup lang="ts">
definePageMeta({
  middleware: ["admin"],
  layout: "admin",
});

const {data: stargates} = await useFetch("/api/stargates")
const {data: users} = await useFetch("/api/users")
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
            {{stargates?.length ?? 0}}
          </h1>
        </CardContent>
      </Card>
      <Card class="flex-1">
        <CardHeader>
          <CardTitle>Registered Users</CardTitle>
        </CardHeader>
        <CardContent>
          <h1
            class="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
          >
            {{users?.length ?? "Data didnt load"}}
          </h1>
        </CardContent>
      </Card>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Users Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {{users}}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>    
  </main>
</template>
