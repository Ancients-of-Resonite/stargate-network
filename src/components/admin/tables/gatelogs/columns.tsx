"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { gateLog } from "database/src/schema";

export const columns: ColumnDef<typeof gateLog.$inferSelect>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: (({ row }) => <Badge variant="ghost" color="green">{row.getValue("type")}</Badge>),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (({ row }) => <Badge variant="ghost">{row.getValue("type")}</Badge>),
  },
  {
    accessorKey: "remote",
    header: "Remote",
  },
  {
    accessorKey: "created",
    header: "Created",
  },
];
