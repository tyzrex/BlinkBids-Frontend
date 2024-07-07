"use client";

import { ColumnDef } from "@tanstack/react-table";

export type PendingOrders = {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
};

export const columns: ColumnDef<PendingOrders>[] = [
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
    header: "Product name",
  },
];
