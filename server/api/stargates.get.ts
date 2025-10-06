import { useDrizzle } from "../utils/drizzle";

export default eventHandler(async (event) => {
  const db = useDrizzle();
  const gates = await db.query.stargates.findMany();
  return gates;
});
