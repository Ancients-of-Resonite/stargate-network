"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";

import { CardAction } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import * as z from "zod";
import createBan from "./create";

export const formSchema = z.object({
  user_id: z.string({ error: "You must input a User ID" }).min(2),
  reason: z.string({ error: "You must input a reason" }).min(3, { error: "Must be longer than 2 characters" }),
});

export default function CreateDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    createBan(data);
    form.reset();
    setOpen(false);
    window.location.reload();
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <CardAction suppressHydrationWarning>
          <Button variant="destructive" onClick={() => setOpen(true)}>Ban A User</Button>
        </CardAction>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ban User</DialogTitle>
        </DialogHeader>
        <form id="addform" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="user_id"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>User ID</FieldLabel>
                  <Input {...field} placeholder="U-AAAAAAAAAA" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="reason"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Reason</FieldLabel>
                  <Textarea {...field} placeholder="Lorem ipsum" aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          </DialogClose>
          <Button type="submit" form="addform" variant="destructive">Ban User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
