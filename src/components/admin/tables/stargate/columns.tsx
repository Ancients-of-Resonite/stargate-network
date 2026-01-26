"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { stargate } from "database/src/schema";
import { MoreHorizontal } from "lucide-react";
import GateEditDialog from "./edit-dialog";

export const columns: ColumnDef<typeof stargate.$inferSelect>[] = [
  {
    accessorKey: "gate_address",
    header: "Gate Address",
  },
  {
    accessorKey: "gate_code",
    header: "Gate Code",
  },
  {
    accessorKey: "gate_status",
    header: "Gate Status",
  },
  {
    accessorKey: "session_name",
    header: "Session Name",
  },
  {
    accessorKey: "owner_name",
    header: "Owner Name",
  },
  {
    accessorKey: "active_users",
    header: "Active Users",
  },
  {
    accessorKey: "max_users",
    header: "Max Users",
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => {
      const gate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <GateEditDialog gate={gate} />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
