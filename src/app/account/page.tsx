import { Card, CardContent } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function AccountPage() {
  return (
    <main>
      <Card>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <SidebarTrigger />
            <Kbd>/account</Kbd>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
