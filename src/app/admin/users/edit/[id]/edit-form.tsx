"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { user as usr } from "database/src/auth-schema";
import { db } from "database/src/db";
import { CircleMinus } from "lucide-react";
import Link from "next/link";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import * as z from "zod";
import editUser from "./edit";

export const formSchema = z.object({
  username: z.string(),
  email: z.string(),
  tags: z.array(z.string()),
});

export default function UserEditForm({ user }: { user: typeof usr.$inferSelect }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.name,
      email: user.email,
      tags: user.tags,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    editUser(user, data);
    router.push("/admin/users");
  }

  return (
    <>
      <form id="gate-edit" onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            <div className="flex gap-4">
              <Field orientation="vertical">
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" disabled defaultValue={user.name} />
              </Field>
              <Field orientation="vertical">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" disabled defaultValue={user.email} />
              </Field>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>User Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {fields.map((field, index) => (
                  <Controller
                    key={field.id}
                    name={`tags.${index}`}
                    control={form.control}
                    render={({ field: controllerField, fieldState }) => (
                      <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <InputGroup>
                            <InputGroupInput
                              {...controllerField}
                              id={`form-array-tags-${index}`}
                              aria-invalid={fieldState.invalid}
                              placeholder="user"
                              type="text"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              onClick={() =>
                                remove(index)}
                            >
                              <CircleMinus size={16} />
                            </Button>
                          </InputGroup>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </FieldContent>
                      </Field>
                    )}
                  />
                ))}
                <Button className="w-full" type="button" variant="secondary" onClick={() => append("")}>Add Tag</Button>
              </CardContent>
            </Card>
          </FieldGroup>
        </CardContent>
      </form>
      <CardFooter>
        <Field orientation="horizontal">
          <Button asChild variant="outline">
            <Link href="/admin/stargates">
              Cancel
            </Link>
          </Button>
          <Button type="submit" form="gate-edit">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </>
  );
}
