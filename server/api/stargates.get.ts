import { db } from "database/src/db";
import { stargate } from "database/src/schema";

export default eventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers
  })

  const isAdmin: boolean = session?.user.tags == undefined ? false : session.user.tags.includes('admin')

  const gates = (await db.select({
    ...(isAdmin ? {id: stargate.id} : {}),
    gate_address: stargate.gate_address,
    gate_code: stargate.gate_code,
    owner_name: stargate.owner_name,
    session_url: stargate.session_url,
    session_name: stargate.session_name,
    active_users: stargate.active_users,
    max_users: stargate.max_users,
    public_gate: stargate.public_gate,
    is_headless: stargate.is_headless,
    gate_status: stargate.gate_status
  }).from(stargate)).filter(v => {
    if (isAdmin) return true
    return v.public_gate == true
  })
  return gates;
});
