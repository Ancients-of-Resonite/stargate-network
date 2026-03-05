"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { apikey, user } from "database/src/auth-schema";
import { MoreHorizontal, Trash2Icon } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Username",
  },
  {
    accessorKey: "name",
    header: "Email",
  },
  {
    accessorKey: "prefix",
    header: "Prefix",
  },
  {
    accessorKey: "expiresAt",
    header: "Expiry Date",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const gate = row.original;

      return (
        <Button size="icon" variant="destructive">
          <Trash2Icon />
        </Button>
      );
    },
  },
];
