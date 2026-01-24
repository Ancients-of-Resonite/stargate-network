"use client";

import { ColumnDef } from "@tanstack/react-table";
import { stargate } from "database/src/schema";

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
];
