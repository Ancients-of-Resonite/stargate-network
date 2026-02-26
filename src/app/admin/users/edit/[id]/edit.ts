"use server"
import { user } from "database/src/auth-schema";
import { infer } from "zod";
import { formSchema } from "./edit-form";
import * as z from "zod"
import { db } from "database/src/db";

export default async function editUser(usr: typeof user.$inferSelect, data: z.infer<typeof formSchema>) {
  await db.update(user).set({
    tags: data.tags,
    email: data.email,
    name: data.username
  })
}
