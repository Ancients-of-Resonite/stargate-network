import { prisma } from "database/src/db";

export default eventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers
  })

  const gates = await prisma.stargates.findMany(
    {
      where: {
        public_gate: session?.user.tags.includes("admin") ? undefined : true
      }
    }
  );
  return gates;
});
