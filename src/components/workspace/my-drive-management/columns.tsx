"use client";

import type { FileProps } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { deleteFile } from "@/lib/firebase/file-utils";
import Link from "next/link";
import { convertSize } from "@/lib/firebase/helpers";

export const columns: ColumnDef<FileProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "mimeSize",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => {
      const size = parseFloat(row.getValue("mimeSize"));
      // let formatted = new Intl.NumberFormat("en-US").format(size);
      let formatted = convertSize(size);
      if (formatted == "NaN") formatted = "--";
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const file = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/workspace/my-drive${
                  file.parentFolder ? "/" + file.parentFolder : "/root"
                }/${file.id}/preview`}
              >
                Open
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href={file.url}>DownLoad</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/workspace/my-drive${
                  file.parentFolder ? "/" + file.parentFolder + "/share" : ""
                }/${file.id}`}
              >
                Share
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                void deleteFile(file.id!, file.owner, file.name)
                  .then(() => {
                    toast({
                      title: "Success",
                      description: "Folder deleted successfully.",
                    });
                  })
                  .catch((_error) => {
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description:
                        "An error occurred while deleting the folder.",
                      action: <ToastAction altText="">Try again</ToastAction>,
                    });
                  });
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const sharedWithMeColumns: ColumnDef<FileProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => <div>{row.getValue("owner")}</div>,
  },
  {
    accessorKey: "mimeSize",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => {
      const size = parseFloat(row.getValue("mimeSize"));
      // let formatted = new Intl.NumberFormat("en-US").format(size);
      let formatted = convertSize(size);
      if (formatted == "NaN") formatted = "--";
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const file = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/workspace/my-drive${
                  file.parentFolder ? "/" + file.parentFolder : "/root"
                }/${file.id}/preview`}
              >
                Open
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href={file.url}>DownLoad</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
