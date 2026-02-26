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
import { bannedIds } from "database/src/schema";
import { MoreHorizontal, Trash } from "lucide-react";

export const columns: ColumnDef<typeof bannedIds.$inferSelect>[] = [
  {
    accessorKey: "user_id",
    header: "User ID",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const gate = row.original;

      return (
        <Button variant="destructive" size="icon">
          <Trash />
        </Button>
      );
    },
  },
];
