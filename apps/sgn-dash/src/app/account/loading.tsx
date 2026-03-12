import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";
export default async function AccountPage() {
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
        <CardContent>
          Loading...
        </CardContent>
      </Card>
    </main>
  );
}
