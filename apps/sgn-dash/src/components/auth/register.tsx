"use client";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const auth = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (auth.error) {
      toast.error(auth.error.message);
    } else {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      redirect("/");
    }
  }

  async function discordAuth(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await authClient.signIn.social({ provider: "discord" });
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-name">Username</FieldLabel>
                  <Input
                    {...field}
                    id="register-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="you"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="register-form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@email.com"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-form-password"
                    aria-invalid={fieldState.invalid}
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="vertical">
          <Button className="w-full" type="submit" form="register-form">
            Register with email
          </Button>
          <Button
            className="w-full"
            onClick={discordAuth}
            type="button"
            variant="secondary"
          >
            Continue with Discord
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
