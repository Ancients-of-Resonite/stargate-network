"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogContent } from "@radix-ui/react-alert-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { bannedIds } from "database/src/schema";
import { MoreHorizontal, Trash, Trash2Icon } from "lucide-react";
import { refresh } from "next/cache";
import { useRouter } from "next/router";
import { unban } from "./unban";

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
    cell: ({ row, table }) => {
      const user = row.original;

      return (
        <Dialog
          onOpenChange={(o) => {
            if (o) return;
            window.location.reload();
          }}
        >
          <DialogTrigger>
            <Button variant="destructive">
              <Trash2Icon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            Are you sure you want to unban this user?
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  variant="destructive"
                  onClick={() => {
                    unban(user);
                  }}
                >
                  Yes, unban
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
