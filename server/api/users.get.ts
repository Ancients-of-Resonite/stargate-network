import { user } from "database/src/auth-schema"
import { db } from "database/src/db"

export default defineEventHandler(async event => {
  const session = await auth.api.getSession({ headers: event.headers })
  const isAdmin = session?.user.tags.includes('admin') ?? false

  return await db.select({
    ...(isAdmin ? { email: user.email } : {}),
    tags: user.tags,
    name: user.name,
    image: user.image,
    created_at: user.createdAt,
  }).from(user)
})
