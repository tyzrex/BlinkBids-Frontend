"use client";

import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";

import { ColumnDef } from "@tanstack/react-table";

import DeleteBank from "./delete-bank";

export type BankColumnsType = {
  id: number;
  bank_name: string;
  bank_code: string;
  bank_email: string;
  emi_6_months_rate: string;
  emi_9_months_rate: string;
  emi_12_months_rate: string;
  emi_18_months_rate: string;
};

export const bankColumns: ColumnDef<BankColumnsType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <span className="flex-center gap-5">
          <span>Bank Id</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },

  {
    accessorKey: "bank_name",
    header: "Bank Name",
  },
  {
    accessorKey: "bank_code",
    header: "Bank Code",
  },
  {
    accessorKey: "bank_email",
    header: "Bank Email",
  },
  {
    accessorKey: "emi_6_months_rate",
    header: "6 Months Rate",
  },
  {
    accessorKey: "emi_9_months_rate",
    header: "9 Months Rate",
  },
  {
    accessorKey: "emi_12_months_rate",
    header: "12 Months Rate",
  },
  {
    accessorKey: "emi_18_months_rate",
    header: "18 Months Rate",
  },

  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/banks/add-bank?id=${row.original.id}`}
            className="p-2 bg-yellow-500 text-white rounded-full"
          >
            <AiOutlineEdit />
          </Link>

          <DeleteBank id={row.original.id} />
        </div>
      );
    },
  },
];
