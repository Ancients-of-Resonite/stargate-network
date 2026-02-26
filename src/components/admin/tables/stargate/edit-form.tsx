"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { stargate } from "database/src/schema";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import Link from "next/link";
import { useNavigation } from "react-day-picker";
import { Controller, useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  public_gate: z.boolean(),
  owner_name: z.string(),
  session_name: z.string(),
});

export default function GateEditForm({ gate }: { gate: typeof stargate.$inferSelect }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      public_gate: gate?.public_gate,
      owner_name: gate?.owner_name,
      session_name: gate?.session_name,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <>
      <form id="gate-edit" onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            <div className="flex gap-4">
              <Field orientation="vertical">
                <FieldContent>
                  <FieldLabel>Gate Address</FieldLabel>
                  <FieldDescription>The first 6 characters of this stargates address</FieldDescription>
                </FieldContent>
                <Input disabled defaultValue={gate.gate_address} />
              </Field>
              <Field orientation="vertical">
                <FieldContent>
                  <FieldLabel>Gate Code</FieldLabel>
                  <FieldDescription>The last two characters of this gates address denoting the code</FieldDescription>
                </FieldContent>
                <Input disabled defaultValue={gate.gate_code} />
              </Field>
            </div>
            <Field orientation="vertical">
              <FieldContent>
                <FieldLabel>Session URL</FieldLabel>
                <FieldDescription>The URI use to connect to the session</FieldDescription>
              </FieldContent>
              <Input disabled defaultValue={gate.session_url} />
            </Field>
            <Controller
              control={form.control}
              name="owner_name"
              render={({ field, fieldState }) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel>Owner Name</FieldLabel>
                    <FieldDescription>The username/user-id the stargate is running on</FieldDescription>
                  </FieldContent>
                  <Input defaultValue={field.value} aria-invalid={fieldState.invalid} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="session_name"
              render={({ field, fieldState }) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel>Session Name</FieldLabel>
                    <FieldDescription>The name of the session to show on the network list</FieldDescription>
                  </FieldContent>
                  <Input defaultValue={field.value} aria-invalid={fieldState.invalid} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="public_gate"
              render={({ field, fieldState }) => (
                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="public-switch">Public Gate</FieldLabel>
                    <FieldDescription>Weather or not to show this stargate on the public list</FieldDescription>
                  </FieldContent>
                  <Switch
                    id="public-switch"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    name={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
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
