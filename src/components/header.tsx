import { auth } from "@/lib/auth";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { Ellipsis } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { GlyphSelector } from "./glyph-selector";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export async function Header() {
  const reqHead = await headers();
  const session = await auth.api.getSession({ headers: reqHead });
  return (
    <div className="p-4 h-16 flex items-center bg-slate-400 dark:bg-neutral-900">
      <div className="flex-1 flex gap-2 items-center">
        <Image width={30} height={30} src="/images/AoR_Chevron2.png" alt="aor-logo" />
        <p className="text-xl">Ancients of Resonite</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-42" asChild>
          <Button size="icon" variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuArrow />
          <DropdownMenuGroup>
            {session && <DropdownMenuItem>My Account</DropdownMenuItem>}
            {!session && (
              <DropdownMenuItem asChild>
                <a href="/auth">Login</a>
              </DropdownMenuItem>
            )}
            <GlyphSelector />
          </DropdownMenuGroup>
          {session?.user.tags.includes("admin") && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
          {session && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
