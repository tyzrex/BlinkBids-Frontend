"use client";

import Link from "next/link";
import { toast } from "sonner";

import { removeCategory } from "@/api/actions";
import { showErrorToasts } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type CategoriesTable = {
  name: string;
  slug: string;
  label: string;
  id: number;
  type: string;
};

export const deleteCategoryById = async (id: number) => {
  const response = await removeCategory(id, "parent");
  if (response.success === true) {
    toast.success(response.message);
  } else {
    showErrorToasts(response.errorData);
  }
};

export const columns: ColumnDef<CategoriesTable>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "type",
    header: "Type",
  },

  {
    accessorKey: "Edit",
    header: "Edit",
    cell: ({ row }) => {
      return (
        <div>
          <Link
            href={`/admin/category/edit-category?name=${row.original.name}`}
            className="text-accent-2 hover:text-gray-900"
          >
            Edit
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "Delete",
    header: "Delete",
    cell: ({ row }) => {
      return (
        <div>
          <button
            onClick={() => deleteCategoryById(row.original.id)}
            className="text-accent-2 hover:text-gray-900"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];
