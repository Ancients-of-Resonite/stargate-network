import { AdminSidebar } from "@/components/admin/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "SGN Admin - Ancients of Resonite",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reqHead = await headers();
  const session = await auth.api.getSession({ headers: reqHead });

  if (!session?.user.tags.includes("admin")) redirect("/");

  return (
    <main>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className="p-4">{children}</SidebarInset>
      </SidebarProvider>
    </main>
  );
}
