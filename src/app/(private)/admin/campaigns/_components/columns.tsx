"use client";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";

import { ColumnDef } from "@tanstack/react-table";
import { deleteExistingCampaign } from "@/api/actions";
import { toast } from "sonner";
import { showErrorToasts } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export type ProductTableColumns = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  description: string;
  is_active: boolean;
  budget: number;
  image: string;
};

async function deleteCampaign(id: number) {
  const response = await deleteExistingCampaign(id);
  if (response.success) {
    toast.success(response.message);
  } else {
    showErrorToasts(response.errorData);
  }
}

export const columns: ColumnDef<ProductTableColumns>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },

  //   {
  //     accessorKey: "image",
  //     header: "Image",
  //     cell: ({ row }) => {
  //       return (
  //         <div className="flex items-center gap-4">
  //           <Image
  //             src={`/api/images/${row.original.image}`}
  //             alt=""
  //             width={500}
  //             height={500}
  //             className="object-contain rounded-xl"
  //           />
  //         </div>
  //       );
  //     },
  //   },

  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Button
            variant={"ghost"}
            className="bg-red-500 text-white rounded-full px-3"
            onClick={() => deleteCampaign(row.original.id)}
          >
            <Trash2Icon size={16} />
          </Button>
        </div>
      );
    },
  },
];
