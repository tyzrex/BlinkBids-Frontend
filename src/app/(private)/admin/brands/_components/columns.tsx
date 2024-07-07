"use client";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import DeleteBrand from "./delete-button";

export type ProductTableColumns = {
  name: string;
  slug: string;
  id: number;
  total_products: number;
};

export const columns: ColumnDef<ProductTableColumns>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "total_products",
    header: "Total Products",
  },

  {
    accessorKey: "Details",
    header: "Details",
    cell: ({ row }) => {
      return (
        <div>
          <Link
            href={`/product-detail/${row.original.slug}`}
            className="text-accent-2 hover:text-gray-900"
          >
            Show Details
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/brands/edit-brand?id=${row.original.id}`}
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
