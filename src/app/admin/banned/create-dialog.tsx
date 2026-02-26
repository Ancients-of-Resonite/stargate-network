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
import { bannedIds } from "database/src/schema";
import { Controller, useForm } from "react-hook-form";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import * as z from "zod";
import createBan from "./create";

export const formSchema = z.object({
  user_id: z.string({ error: "You must input a User ID" }),
  reason: z.string({ error: "You must input a reason" }),
});

export default function CreateDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      user_id: "",
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  function onSubmit(data: z.infer<typeof formSchema>) {
    createBan(data);
    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} modal={false}>
      <DialogTrigger asChild>
        <Button variant="destructive" onClick={() => setOpen(!open)}>Ban New User</Button>
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
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="addform" variant="destructive">Ban User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
