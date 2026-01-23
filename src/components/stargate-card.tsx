import { stargate } from "database/src/schema";
import { Lock, Server, User } from "lucide-react";
import { Card, CardHeader, CardTitle } from "../components/ui/card";

export function StargateCard({ gate }: { gate: typeof stargate.$inferInsert }) {
  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          {gate.is_headless ? <Server size={16} /> : <User size={16} />} {!gate.public_gate && <Lock />}{" "}
          {gate.session_name}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
