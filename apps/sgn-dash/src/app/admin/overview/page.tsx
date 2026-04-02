import { DataTable } from "@/components/admin/tables/data-table";
import { columns as stargate_col } from "@/components/admin/tables/stargate/columns";
import { columns as user_col } from "@/components/admin/tables/users/columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { user } from "database/src/auth-schema";
import { db } from "database/src/db";
import { stargate } from "database/src/schema";

export default async function AdminDashboard() {
  const stargates = (await db.select().from(stargate)).sort((a, b) => b.created!.getTime() - a.created!.getTime());
  const users = await db.select().from(user);

  return (
    <main className="space-y-4">
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            <Kbd>/admin/overview</Kbd>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Active Stargates</CardTitle>
          </CardHeader>
          <CardContent>{stargates.length} Total Gates</CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Registered Users</CardTitle>
          </CardHeader>
          <CardContent>{users.length} Total Users</CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Stargate Overview</CardTitle>
          <CardDescription>Shows the 5 most recently updated stargates</CardDescription>
          <CardContent className="mt-4">
            <DataTable columns={stargate_col} data={stargates.slice(0, 5)} hidePagination />
          </CardContent>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>User Overview</CardTitle>
          <CardDescription>Shows the 5 most recently created users</CardDescription>
          <CardContent className="mt-4">
            <DataTable columns={user_col} data={users.slice(0, 5)} hidePagination />
          </CardContent>
        </CardHeader>
      </Card>
    </main>
  );
}
