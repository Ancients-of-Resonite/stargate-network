"use client";

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
    cell: (({ row }) => {
      const tags: string[] = row.getValue("tags");
      return tags.map(tag => <Badge key={tag}>{tag}</Badge>);
    }),
  },
];
