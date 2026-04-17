import { DataTable } from "@/components/admin/tables/data-table";
import { columns } from "@/components/admin/tables/users/columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { user } from "database/src/auth-schema";
import { db } from "database/src/db";

export default async function UsersAdminPage() {
  const users = await db.select().from(user);
  return (
    <main className="space-y-4">
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            <Kbd>/admin/users</Kbd>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>User Overview</CardTitle>
          <CardDescription>Shows every created user</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <DataTable columns={columns} data={users} />
        </CardContent>
      </Card>
    </main>
  );
}
