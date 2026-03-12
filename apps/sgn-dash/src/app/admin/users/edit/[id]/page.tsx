import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { user as usr } from "database/src/auth-schema";
import { db } from "database/src/db";
import { stargate } from "database/src/schema";
import UserEditForm from "./edit-form";

export default async function EditGate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = (await db.selectDistinct().from(usr)).find(u => u.id == id);

  if (!user) return <div>no user</div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            <Kbd>/admin/stargates/edit/{id}</Kbd>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Editing{" "}
            <KbdGroup>
              <Kbd className="text-white">{user.name}</Kbd>
              <Kbd className="text-white">{user.email}</Kbd>
            </KbdGroup>
          </CardTitle>
        </CardHeader>
        <UserEditForm user={user} />
      </Card>
    </div>
  );
}
