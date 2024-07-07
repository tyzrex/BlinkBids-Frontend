"use client";

import { ArchiveRestoreIcon, ArrowUpDown, Trash } from "lucide-react";
import Link from "next/link";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "sonner";

import {
  hardDeleteProduct,
  removeProduct,
  restoreProduct,
} from "@/api/actions";
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
  const response = await hardDeleteProduct(id);
  if (response.success === true) {
    toast.success(response.message);
  } else {
    showErrorToasts(response.errorData);
  }
};

const restoreExistingProduct = async (id: number) => {
  const response = await restoreProduct(id);
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
          <button
            className="p-2 bg-green-500 text-white rounded-full"
            onClick={() => {
              restoreExistingProduct(parseInt(row.original.id));
            }}
          >
            <ArchiveRestoreIcon size={16} />
          </button>

          <button
            onClick={() => {
              deleteProductById(parseInt(row.original.id));
            }}
            className="p-2 bg-red-500 text-white rounded-full"
          >
            <Trash size={16} />
          </button>
        </div>
      );
    },
  },
];
