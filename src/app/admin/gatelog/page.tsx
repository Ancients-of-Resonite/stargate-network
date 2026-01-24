import { DataTable } from "@/components/admin/tables/data-table";
import { columns } from "@/components/admin/tables/gatelogs/columns";
import { main } from "bun";
import { db } from "database/src/db";
import { gateLog } from "database/src/schema";

export default async function AdminGateLogs() {
  const logs = await db.select().from(gateLog);
  return (
    <main>
      <DataTable columns={columns} data={logs} />
    </main>
  );
}
