"use client";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { reload } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  image: z.string().optional(),
});

export default function AccountEditForm() {
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    authClient.updateUser({
      name: data.name ?? session!.user.name,
      image: data.image ?? session!.user.image,
    }).then(() => {
      reload("/account");
      toast.success("Saved account");
      setLoading(false);
    });
  }

  return (
    <>
      <CardContent>
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
                  <Input
                    {...field}
                    id="username"
                    defaultValue={session?.user.email}
                    disabled
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button disabled={loading} variant="outline" className="w-full" form="account-edit">
          Save {loading && <Spinner />}
        </Button>
      </CardFooter>
    </>
  );
}
