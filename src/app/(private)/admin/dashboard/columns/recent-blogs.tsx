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
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Blog Name",
  },
  {
    accessorKey: "short_desc",
    header: "Author",
  },
];
