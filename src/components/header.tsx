import { Ellipsis } from "lucide-react";
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

export function Header() {
  return (
    <div className="p-4 h-16 flex items-center bg-slate-400 dark:bg-neutral-900">
      <div className="flex-1 flex gap-2 items-center">
        <Image width={30} height={30} src="/images/AoR_Chevron2.png" alt="aor-logo" />
        <p className="text-xl">Ancients of Resonite</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>My Account</DropdownMenuItem>
            <GlyphSelector />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
