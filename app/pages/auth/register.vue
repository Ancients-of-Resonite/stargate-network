<script setup lang="ts">
definePageMeta({
  layout: "empty",
});

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    username: z.string(),
    email: z.email("Invalid email address"),
    password: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <Card class="mx-auto min-w-md">
      <CardHeader>
        <CardTitle class="text-xl">Register</CardTitle>
        <CardDescription>Create a Stargate Network account</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <div class="grid gap-4">
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <div class="grid gap-2">
                  <FormLabel for="username">Username</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      v-bind="componentField"
                      type="text"
                      placeholder="some user"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <div class="grid gap-2">
                  <FormLabel for="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      v-bind="componentField"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <div class="grid gap-2">
                  <FormLabel for="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      v-bind="componentField"
                      type="password"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            </FormField>
            <Button type="submit" class="w-full">Login</Button>
            <Button variant="outline" class="w-full">
              Continue with Discord
            </Button>
          </div>
        </form>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <a href="/auth/login" class="underline">Login here!</a>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
