import { columns } from "@/components/admin/tables/bannedids/columns";
import { DataTable } from "@/components/admin/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { db } from "database/src/db";
import { bannedIds } from "database/src/schema";
import CreateDialog from "./create-dialog";

export default async function BannedPage() {
  const bannedusers = await db.select().from(bannedIds);
  return (
    <main className="space-y-4">
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            <Kbd>/admin/banned</Kbd>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Banned Users</CardTitle>
          <CardDescription>A list of banned users</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={bannedusers} />
        </CardContent>
        <CardFooter>
          <CreateDialog />
        </CardFooter>
      </Card>
    </main>
  );
}
