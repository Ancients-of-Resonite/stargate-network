"use client";

import UserEditDialog from "@/app/admin/users/edit-dialog";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { user } from "database/src/auth-schema";

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
    cell: ({ row }) => {
      const tags: string[] = row.getValue("tags");
      return (
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const user = row.original;

      return <UserEditDialog usr={user} />;
    },
  },
];
