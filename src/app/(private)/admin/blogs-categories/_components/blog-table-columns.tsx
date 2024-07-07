"use client";

import { format } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";

import { deleteBlogCategory } from "@/api/actions";
import { showErrorToasts } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type BlogTableColumns = {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export const deleteBlogCategoryById = async (id: number) => {
  const response = await deleteBlogCategory(id);
  if (response.success === true) {
    toast.success(response.message);
  } else {
    showErrorToasts(response.errorData);
  }
};

export const blogColumns: ColumnDef<BlogTableColumns>[] = [
  { accessorKey: "id", header: "Id" },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "short_desc",
    header: "Short Description",
    cell: ({ row }) => {
      //terminating the string after 100 characters
      const str = row.original.short_desc;
      const res = str?.substring(0, 50);
      return <div>{res}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <>{format(new Date(row.original.created_at), "dd-MM-yyyy,hh:mm")}</>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      return (
        <>{format(new Date(row.original.updated_at), "dd-MM-yyyy,hh:mm")}</>
      );
    },
  },
  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <Link
            href={`/admin/blogs-categories/edit-blog-category/${row.original.id}`}
            className="text-accent-2 hover:text-gray-900"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteBlogCategoryById(row.original.id)}
            className="text-accent-2 hover:text-gray-900"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];
