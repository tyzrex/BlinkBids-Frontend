"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import DeleteBrand from "../../brands/_components/delete-button";

export type BlogTableColumns = {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
  actions: any;
};

export const columns: ColumnDef<BlogTableColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "short_desc",
    header: "Short Description",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/blogs/edit-blog?slug=${row.original.slug}`}
            className="p-2 bg-yellow-500 text-white rounded-full"
          >
            <AiOutlineEdit />
          </Link>

          <DeleteBrand id={row.original.id} />
        </div>
      );
    },
  },
];
