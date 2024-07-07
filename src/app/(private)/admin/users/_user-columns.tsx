"use client";

import { ColumnDef } from "@tanstack/react-table";

export type BlogTableColumns = {
  id: number;
  last_login: string;
  email: string;
  name: string;
  phone: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  provider: string;
  address: string;
  district: string;
  address_description: string;
  is_mod: boolean;
  groups: any[];
  user_permissions: any[];
};

export const columns: ColumnDef<BlogTableColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "is_active",
    header: "Active",
  },
  {
    accessorKey: "is_mod",
    header: "Moderator",
  },
];
