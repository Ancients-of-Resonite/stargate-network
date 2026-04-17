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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { user } from "database/src/auth-schema";
import { CircleMinus, PencilIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import * as z from "zod";
import editUser from "./edit";

export const formSchema = z.object({
  username: z.string(),
  email: z.string(),
  tags: z.array(z.object({ tag: z.string() })),
});

export default function UserEditDialog({
  usr,
}: {
  usr: typeof user.$inferSelect;
}) {
  const [tag, setTag] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: usr.email,
      username: usr.name,
      tags: usr.tags.map((t) => {
        return {
          tag: t,
        };
      }),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    editUser(usr, data);
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
              <Kbd>{usr.name}</Kbd> <Kbd>{usr.email}</Kbd>
            </KbdGroup>
          </DialogDescription>
          <form id="user-edit" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex gap-4">
                <Field orientation="vertical">
                  <FieldLabel>Username</FieldLabel>
                  <Input defaultValue={usr.name} disabled />
                </Field>
                <Field orientation="vertical">
                  <FieldLabel>Email</FieldLabel>
                  <Input defaultValue={usr.email} disabled />
                </Field>
              </div>
              <Card>
                <CardContent className="space-y-2">
                  {fields.map((field, index) => (
                    <Controller
                      control={form.control}
                      name={`tags.${index}`}
                      key={field.id}
                      render={({ field: controllerField, fieldState }) => (
                        <Field
                          orientation="horizontal"
                          data-invalid={fieldState.invalid}
                        >
                          <FieldContent>
                            <InputGroup>
                              <InputGroupInput
                                {...controllerField}
                                id={`form-array-tags-${index}`}
                                aria-invalid={fieldState.invalid}
                                placeholder="user"
                                type="text"
                                value={field.tag}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <CircleMinus size={16} />
                              </Button>
                            </InputGroup>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </FieldContent>
                        </Field>
                      )}
                    />
                  ))}
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Input
                      className=""
                      placeholder="Enter tag..."
                      onChange={(e) => {
                        setTag(e.target.value);
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        append({ tag: tag! });
                      }}
                      disabled={!tag}
                      variant="outline"
                    >
                      Add Tag
                    </Button>
                  </div>
                </CardFooter>
              </Card>
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
