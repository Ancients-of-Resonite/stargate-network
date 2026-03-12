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
import { user } from "database/src/auth-schema";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<typeof user.$inferSelect>[] = [
  {
    accessorKey: "name",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: (({ row }) => {
      const tags: string[] = row.getValue("tags");
      return <div className="flex gap-2">{tags.map(tag => <Badge key={tag}>{tag}</Badge>)}</div>;
    }),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const gate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-8 w-8" asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={`/admin/users/edit/${gate.id}`}>Edit User</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
