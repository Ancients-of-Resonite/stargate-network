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
import { Kbd } from "@/components/ui/kbd";
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
  const [created, setCreated] = useState(false);
  const [key, setKey] = useState("");

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);

    authClient.apiKey.create({
      prefix: "sgn_",
      name: data.name,
    }).then((key) => {
      setKey(key.data!.key);
      setCreated(true);
    }).finally(() => {
      setOpen(false);
      form.reset();
      reload("/account");
      setLoading(false);
    });
  }

  return (
    <>
      <Dialog open={created} onOpenChange={setCreated}>
        <DialogContent className="min-w-[690px]">
          <DialogHeader>
            <DialogTitle>API Key Created</DialogTitle>
            <DialogDescription>
              Please copy this key and save it somewhere safe. You will not be able to regain this key after closing
              this menu.
              <br />
              <br />
              <Kbd className="text-sm select-all">{key}</Kbd>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                navigator.clipboard.writeText(key).then(() => {
                  toast.success("Copied to clipboard");
                  setCreated(false);
                  setKey("");
                }).catch(() => {
                  toast.error("Failed to copy to clipboard");
                });
              }}
            >
              Copy key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">Create New API Key</Button>
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
    </>
  );
}
