"use server"
import { user } from "database/src/auth-schema";
import { infer } from "zod";
import { formSchema } from "./edit-form";
import * as z from "zod"
import { db } from "database/src/db";

export default async function editUser(usr: typeof user.$inferSelect, data: z.infer<typeof formSchema>) {
  const tags = data.tags.map(t => t.tag)
  await db.update(user).set({
    tags: tags,
    email: data.email,
    name: data.username
  })
}
