"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { stargate } from "database/src/schema";
import { MoreHorizontal } from "lucide-react";

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
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const gate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={`/admin/stargates/edit/${gate.id}`}>Edit Gate</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
