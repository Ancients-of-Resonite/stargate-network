import { prisma } from "database/src/db"

export default defineEventHandler(async event => {
  const session = await auth.api.getSession({ headers: event.headers })
  const isAdmin = session?.user.tags.includes('admin') ?? false

  return await prisma.user.findMany({
    select: {
      name: true,
      image: true,
      createdAt: true,
      _count: true,
      email: isAdmin
    }
  })
})
