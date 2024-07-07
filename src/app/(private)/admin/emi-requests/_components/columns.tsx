"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

export type EmiTableColumns = {
  name: string;
  full_name: string;
  email: string;
  contact_number: string;
  has_credit_card: boolean;
  id: string;
};

export const columns: ColumnDef<EmiTableColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "full_name",
    header: "Applier's Name",
  },
  {
    accessorKey: "email",
    header: "Applier Email",
  },
  {
    accessorKey: "contact_number",
    header: "Applier's Contact Number",
  },
  {
    accessorKey: "has_credit_card",
    header: "Has Credit Card",
    cell: ({ row }) => {
      return row.original.has_credit_card ? "Yes" : "No";
    },
  },
  {
    header: "Emi Details",
    cell: ({ row }) => {
      return (
        <div>
          <Link
            prefetch={false}
            href={`/admin/emi-requests/detail/${row.original.id}`}
          >
            View
          </Link>
        </div>
      );
    },
  },
];
