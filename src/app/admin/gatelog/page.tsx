import { DataTable } from "@/components/admin/tables/data-table";
import { columns } from "@/components/admin/tables/gatelogs/columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { main } from "bun";
import { db } from "database/src/db";
import { gateLog } from "database/src/schema";

export default async function AdminGateLogs() {
  const logs = await db.select().from(gateLog);
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Stargate Logs</CardTitle>
          <CardDescription>All activity logs for the stargate network</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={logs} />
        </CardContent>
      </Card>
    </main>
  );
}
