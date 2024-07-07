"use client";

import { ColumnDef } from "@tanstack/react-table";

export type RecentBlogs = {
  id: number;
  title: string;
  slug: string;
};

export const columns: ColumnDef<RecentBlogs>[] = [
  {
    accessorKey: "id",
    header: "Campaign Name",
  },
  {
    accessorKey: "title",
    header: "Start Date",
  },
  {
    accessorKey: "short_desc",
    header: "End Date",
  },
];
