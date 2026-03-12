import { db, eq } from 'database/src/db'
import { stargate } from 'database/src/schema'
import type { NextRequest } from 'next/server'
 
export async function GET(_req: NextRequest, ctx: RouteContext<'/api/stargate/[address]'>) {
  const { address } = await ctx.params

  const gate = await db.selectDistinct().from(stargate).where(eq(stargate.gate_address, address))

  if (gate.length == 1) {
    return Response.json({...gate[0]}, {status: 200})
  } else {
    return Response.json({message: "Gate not found", status: 404}, {status: 404, statusText: "Gate not found"})
  }
}
