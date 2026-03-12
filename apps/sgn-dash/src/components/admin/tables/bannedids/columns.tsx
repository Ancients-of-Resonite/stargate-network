"use client";

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
import { Spinner } from "@/components/ui/spinner";
import { reload } from "@/lib/actions";
import { ColumnDef } from "@tanstack/react-table";
import { bannedIds } from "database/src/schema";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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

      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      return (
        <Dialog
          open={open}
          onOpenChange={setOpen}
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
              <Button
                disabled={loading}
                variant="destructive"
                onClick={() => {
                  setLoading(true);
                  unban(user).then(() => {
                    setOpen(false);
                    reload("/admin/banned");
                    toast.success("Unbanned user");
                  }).catch(() => {
                    toast.error("Failed to unban");
                  });
                }}
              >
                Yes, unban
                {loading && <Spinner />}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
