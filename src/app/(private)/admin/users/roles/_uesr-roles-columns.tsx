"use client";

import { getInitials } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { UserSwitch } from "./_user-switch";

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

export const userRoleColumns: ColumnDef<BlogTableColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    header: "User details",
    accessorKey: "",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex-center">
            {getInitials(row.original.name)}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">{row.original.name}</h3>
            <p className="text-sm">{row.original.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "is_mod",
    header: "Moderator",
    cell: ({ row }) => {
      return (
        <div>
          <UserSwitch id={row.original.id} isMod={row.original.is_mod} />
        </div>
      );
    },
  },
];
