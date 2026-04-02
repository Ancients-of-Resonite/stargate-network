import { DataTable } from "@/components/admin/tables/data-table";
import { columns } from "@/components/admin/tables/gatelogs/columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "database/src/db";
import { gateLog } from "database/src/schema";

export default async function AdminGateLogs() {
  const logs = (await db.select().from(gateLog)).sort((a, b) => b.created!.getTime() - a.created!.getTime());
  return (
    <main className="space-y-4">
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            <Kbd>/admin/gatelog</Kbd>
          </div>
        </CardContent>
      </Card>
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
