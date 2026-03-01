import { auth } from "@/lib/auth";
import { ChevronUp, Home, User2, UserCogIcon } from "lucide-react";
import { headers } from "next/headers";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "../ui/sidebar";

export async function UserSidebar() {
  const reqHead = await headers();
  const session = await auth.api.getSession({ headers: reqHead });

  const apikeys = auth.api.listApiKeys({
    headers: reqHead,
  });

  return (
    <Sidebar variant="inset">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild>
                  <a href="/account">
                    <UserCogIcon size={18} /> Profile
                  </a>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton variant="outline">
              <User2 size={12} /> {session?.user.name} <ChevronUp size={12} className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem asChild>
              <a href="/">
                <Home size={8} /> Home
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
