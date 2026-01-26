import { DataTable } from "@/components/admin/tables/data-table";
import { columns } from "@/components/admin/tables/stargate/columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "database/src/db";
import { stargate } from "database/src/schema";

export default async function AdminStargates() {
  const stargates = await db.select().from(stargate);
  return (
    <main className="space-y-4">
      <Card>
        <CardContent className="flex justify-between items-center">
          <SidebarTrigger />{" "}
          <p>
            /admin/stargates [{stargates.length} total active stargate | {stargates.filter(v => v.public_gate).length}
            {" "}
            total public gates | {stargates.filter(v => !v.public_gate).length} total private gates]
          </p>
        </CardContent>
      </Card>
      <div className="flex gap-4 flex-wrap">
        <Card className="flex-1 min-w-52">
          <CardHeader>
            <CardTitle>MilkyWay Stargates</CardTitle>
          </CardHeader>
          <CardContent>{stargates.filter(v => v.gate_code === "M@").length}</CardContent>
        </Card>
        <Card className="flex-1 min-w-52">
          <CardHeader>
            <CardTitle>Pegasus Stargates</CardTitle>
          </CardHeader>
          <CardContent>{stargates.filter(v => v.gate_code === "P@").length}</CardContent>
        </Card>
        <Card className="flex-1 min-w-52">
          <CardHeader>
            <CardTitle>Universe Stargates</CardTitle>
          </CardHeader>
          <CardContent>{stargates.filter(v => v.gate_code === "U@").length}</CardContent>
        </Card>
        <Card className="flex-1 min-w-52">
          <CardHeader>
            <CardTitle>Dawn Stargates</CardTitle>
          </CardHeader>
          <CardContent>{stargates.filter(v => v.gate_code === "R@").length}</CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Stargates</CardTitle>
          <CardDescription>A list of all active stargates</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={stargates} />
        </CardContent>
      </Card>
    </main>
  );
}
