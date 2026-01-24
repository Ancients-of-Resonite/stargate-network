import { auth } from "@/lib/auth";
import { ChevronUp, FileText, Home, List, LucideLayoutDashboard, ShieldBan, User2, Users } from "lucide-react";
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

export async function AdminSidebar() {
  const reqHead = await headers();
  const session = await auth.api.getSession({ headers: reqHead });

  return (
    <Sidebar variant="inset">
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/dashboard">
                    <LucideLayoutDashboard size={18} /> Overview
                  </a>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Stargates</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/stargates">
                    <List size={18} /> Stargates
                  </a>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/gatelog">
                    <FileText size={18} /> Gate Log
                  </a>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Users</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/users">
                    <Users size={18} /> Users
                  </a>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/bannedusers">
                    <ShieldBan size={18} /> Users
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
