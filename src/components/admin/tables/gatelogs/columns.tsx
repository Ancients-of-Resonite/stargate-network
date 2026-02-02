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

const Time = dynamic(() => import("./time"), { ssr: false });

export const columns: ColumnDef<typeof gateLog.$inferSelect>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: (({ row }) => <Badge variant="ghost" color="green">{row.getValue("type")}</Badge>),
  },
  {
    accessorKey: "status",
    header: "Status",
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
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created") as Date;
      return <Time date={date} />;
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const log = row.original as any;

      return (
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
                Remote: <span>{log.remtoe}</span>
              </p>
              <p>
                Message: <span>{log.data.message}</span>
              </p>
              {log.type === "CREATE" || log.type == "VALIDATE" && <p>Gate: {log.data.gate}</p>}
              {log.type === "DIALOUT" && <p>Origin Gate: {log.data.origin_gate}</p>}
              {log.type === "DIALOUT" && <p>End Gate: {log.data.endgate}</p>}
            </div>
          </SheetContent>
        </Sheet>
      );
    },
  },
];
