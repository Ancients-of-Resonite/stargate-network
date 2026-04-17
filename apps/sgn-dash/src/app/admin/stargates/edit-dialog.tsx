"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { stargate } from "database/src/schema";
import { CircleMinus, PencilIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import * as z from "zod";
import editGate from "./edit";
import { Switch } from "@/components/ui/switch";

export const formSchema = z.object({
  session_name: z.string(),
  is_public: z.boolean(),
});

export default function GateEditDialog({
  gate,
}: {
  gate: typeof stargate.$inferSelect;
}) {
  const [tag, setTag] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      session_name: gate.session_name,
      is_public: gate.public_gate,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    editGate(gate, data);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Editing user{" "}
            <KbdGroup>
              <Kbd>{gate.gate_address}</Kbd> <Kbd>{gate.gate_code}</Kbd>
            </KbdGroup>
          </DialogDescription>
          <form id="user-edit" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex gap-4">
                <Field orientation="vertical">
                  <FieldLabel>Address</FieldLabel>
                  <Input defaultValue={gate.gate_address} disabled />
                </Field>
                <Field orientation="vertical">
                  <FieldLabel>Code</FieldLabel>
                  <Input defaultValue={gate.gate_code} disabled />
                </Field>
              </div>
              <Field orientation="vertical">
                <FieldLabel>Session URL</FieldLabel>
                <Input defaultValue={gate.session_url} disabled />
              </Field>
              <Controller
                control={form.control}
                name="session_name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldTitle>Gate Name</FieldTitle>
                      <FieldDescription>
                        The name of the gate shown on the API
                      </FieldDescription>
                    </FieldContent>
                    <Input {...field} aria-invalid={fieldState.invalid} />
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="is_public"
                render={({ field, fieldState }) => (
                  <FieldLabel htmlFor="public-switch">
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldTitle>Public Stargate</FieldTitle>
                        <FieldDescription>
                          Show this stargate on the public list
                        </FieldDescription>
                      </FieldContent>
                      <Switch
                        id="public-switch"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </Field>
                  </FieldLabel>
                )}
              />
            </FieldGroup>
          </form>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button form="user-edit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
