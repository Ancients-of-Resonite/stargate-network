import { Header } from "@/components/header";
import { StargateCard } from "@/components/stargate-card";
import { auth } from "@/lib/auth";
import { db } from "database/src/db";
import { stargate } from "database/src/schema";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAdmin = session?.user.tags.includes("admin");

  const stargates = (await db.select({
    ...(isAdmin ? { id: stargate.id } : {}),
    gate_address: stargate.gate_address,
    gate_code: stargate.gate_code,
    gate_status: stargate.gate_status,
    owner_name: stargate.owner_name,
    session_name: stargate.session_name,
    session_url: stargate.session_url,
    active_users: stargate.active_users,
    max_users: stargate.max_users,
    public_gate: stargate.public_gate,
    is_headless: stargate.is_headless,
    iris_state: stargate.iris_state,
  }).from(stargate)).filter(v => {
    if (isAdmin) return true;
    return v.public_gate;
  });

  return (
    <div className="font-sans">
      <Header />
      <main className="p-6 flex flex-wrap gap-4 justify-center">
        {stargates.map(gate => <StargateCard gate={gate} key={gate.gate_address} />)}
      </main>
    </div>
  );
}
