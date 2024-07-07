"use client";

import { ColumnDef } from "@tanstack/react-table";

export type PendingEMI = {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
  actions: any;
};

export const columns: ColumnDef<PendingEMI>[] = [
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
    header: "Bank",
  },
  {
    accessorKey: "slug",
    header: "Contact Info",
  },
  {
    accessorKey: "slug",
    header: "Product name",
  },
];
