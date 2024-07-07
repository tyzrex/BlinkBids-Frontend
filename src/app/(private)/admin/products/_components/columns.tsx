"use client";

import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { TrashIcon, EditIcon, CopyPlus } from "lucide-react";
import { toast } from "sonner";

import { duplicateProduct, removeProduct } from "@/api/actions";
import { showErrorToasts } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type ProductTableColumns = {
  name: string;
  price: number;
  brand: string;
  category: string;
  slug: string;
  id: string;
};

export const deleteProductById = async (id: number) => {
  const response = await removeProduct(id);
  if (response.success === true) {
    toast.success(response.message);
  } else {
    showErrorToasts(response.errorData);
  }
};

const copyProduct = async (id: number) => {
  const response = await duplicateProduct(id);
  if (response.success === true) {
    toast.success(response.message);
  } else {
    showErrorToasts(response.errorData);
  }
};

export const columns: ColumnDef<ProductTableColumns>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <span className="flex-center gap-5">
          <span>Product Id</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="flex-center gap-5">
            <span>Name</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </span>
        </button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="flex-center gap-5">
            <span>Price</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </span>
        </button>
      );
    },
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "slug",
    header: "Slug",
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
            href={`/admin/products/edit-product?id=${row.original.id}`}
            className="p-2 bg-yellow-500 text-white rounded-full"
          >
            <EditIcon className="h-4 w-4" />
          </Link>

          <button
            onClick={() => {
              copyProduct(parseInt(row.original.id));
            }}
            className="p-2 bg-blue-500 text-white rounded-full"
          >
            <CopyPlus className="h-4 w-4" />
          </button>

          <button
            onClick={() => {
              deleteProductById(parseInt(row.original.id));
            }}
            className="p-2 bg-red-500 text-white rounded-full"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      );
    },
  },
];
