"use client";

import { Button } from "@/components/ui/button";
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
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { reload } from "@/lib/actions";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(3),
});

export default function CreateKey() {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);

    authClient.apiKey.create({
      prefix: "sgn_",
      name: data.name,
    }).then((key) => {
      toast(`Created Key: ${key.data?.key}`, {
        position: "top-center",
        description: "You will have to manually ",
        action: (
          <Button
            onClick={() => {
              navigator.clipboard.writeText(key.data?.key ?? "");
            }}
          >
            Copy API Key
          </Button>
        ),
      });
    }).finally(() => {
      setOpen(false);
      reload("/account");
      setLoading(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New API Key</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>Create an API key to interact with the stargate network's API</DialogDescription>
        </DialogHeader>
        <form id="key-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="apiname">Key Name</FieldLabel>
                    <FieldDescription>A memorable identifier for this API key</FieldDescription>
                  </FieldContent>
                  <Input {...field} id="apiname" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button form="key-form">Create Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
