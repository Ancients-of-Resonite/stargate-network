"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { gateLog } from "database/src/schema";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const columns: ColumnDef<typeof gateLog.$inferSelect>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: (({ row }) => <Badge variant="ghost" color="green">{row.getValue("type")}</Badge>),
  },
  {
    accessorKey: "status",
    header: () => <p className="w-16">Status</p>,
    cell: (({ row }) => {
      const status = row.getValue("status") as number;

      return (
        <Badge
          className={cn(
            status == 200 && "bg-emerald-400/50",
            status == 418 && "bg-emerald-400/50",
            status == 403 && "bg-amber-500/50",
            status == 302 && "bg-amber-500/50",
            status == 404 && "bg-red-400/50",
            status == 500 && "bg-red-800",
          )}
          variant="secondary"
        >
          {status}
        </Badge>
      );
    }),
  },
  {
    accessorKey: "remote",
    header: "Remote",
  },
  {
    accessorKey: "created",
    header: () => <p className="text-right">Created</p>,
    cell: ({ row }) => {
      const date = row.getValue("created") as Date;

      return (
        <div className="text-right">
          <time dateTime={date.toISOString()}>
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="w-8 text-right" />,
    cell: ({ row }) => {
      const log = row.original as typeof gateLog.$inferSelect;
      const logData = log.data as any;

      return (
        <div className="w-8 text-right">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">
                Details <ArrowRight size={16} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Gate Log</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="p-2 space-y-2">
                <p>
                  Type: <span>{log.type}</span>
                </p>
                <p>
                  Status: <span>{log.status}</span>
                </p>
                <p>
                  Remote: <span>{log.remote}</span>
                </p>
                <p>
                  Message: <span>{logData.message}</span>
                </p>
                {log.type === "CREATE" || log.type == "VALIDATE" && <p>Gate: {logData.gate}</p>}
                {log.type === "DIALOUT" && <p>Origin Gate: {logData.origin_gate}</p>}
                {log.type === "DIALOUT" && <p>End Gate: {logData.endgate}</p>}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      );
    },
  },
];
