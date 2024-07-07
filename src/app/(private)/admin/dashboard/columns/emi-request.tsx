"use client";

import { ColumnDef } from "@tanstack/react-table";

export type PendingEMI = {
  id: number;
  title: string;
  amount: any;
  short_desc: string;
  down_payment: any;
  product_name: any;
};

export const PendingEmiColumns: ColumnDef<PendingEMI>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Customer's Name",
  },
  {
    accessorKey: "short_desc",
    header: "Amount",
  },
  {
    accessorKey: "slug",
    header: "Down Payment",
  },
  {
    accessorKey: "slug",
    header: "Product name",
  },
];
