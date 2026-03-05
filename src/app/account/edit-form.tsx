"use client";

import { authClient } from "@/lib/auth-client";

import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  image: z.string().optional(),
});

export default function AccountEditForm() {
  const { data: session } = authClient.useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session?.user.name,
      email: session?.user.email,
      image: session?.user.image ?? undefined,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    authClient.updateUser({
      name: data.name,
      image: data.image,
    });
    authClient.changeEmail({
      newEmail: data.email,
    });
  }

  return (
    <form id="account-edit" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field orientation="vertical" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <FieldDescription>The public display name you go by</FieldDescription>
              </FieldContent>
              <Input {...field} id="username" defaultValue={session?.user.name} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field orientation="vertical" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <FieldDescription>The email you use to login</FieldDescription>
              </FieldContent>
              <Input {...field} id="username" defaultValue={session?.user.email} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
