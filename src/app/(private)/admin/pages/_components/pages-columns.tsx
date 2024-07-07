"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import DeletePage from "./delete-page";

export type PagesColumns = {
  id: number;
  name: string;
  actions: any;
};

export const pagesColumns: ColumnDef<PagesColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Page Name",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/pages/edit-page?name=${row.original.name}&id=${row.original.id}`}
            className="p-2 bg-yellow-500 text-white rounded-full"
          >
            <AiOutlineEdit />
          </Link>

          <DeletePage id={row.original.id} />
        </div>
      );
    },
  },
];
