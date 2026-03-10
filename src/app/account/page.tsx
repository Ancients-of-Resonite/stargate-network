import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/ui/form";
import { Kbd } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { columns } from "@/components/admin/tables/apikeys/columns";
import { DataTable } from "@/components/admin/tables/data-table";
import { Button } from "@/components/ui/button";
import { ApiKey } from "better-auth/plugins";
import CreateDialog from "../admin/banned/create-dialog";
import CreateKey from "./create-key";
import AccountEditForm from "./edit-form";
import LocalSettings from "./localsettings";

export default async function AccountPage() {
  let keys = await auth.api.listApiKeys({
    headers: await headers(),
  });
  return (
    <main className="space-y-4">
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            <Kbd>/account</Kbd>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Change some of your account settings here :3
          </CardDescription>
        </CardHeader>
        <AccountEditForm />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Local Browser Settings</CardTitle>
          <CardDescription>
            Some funny lil local browser settings :3
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LocalSettings />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Change some of your account settings here :3
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={keys} />
        </CardContent>
        <CardFooter>
          <CreateKey />
        </CardFooter>
      </Card>
    </main>
  );
}
