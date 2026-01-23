"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";

export function LogoutDropdownButton() {
  function logout() {
    authClient.signOut();
    window.location.reload();
  }
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive" onClick={logout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
}
