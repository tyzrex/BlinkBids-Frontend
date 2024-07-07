"use client";
import Image from "next/image";
import { toast } from "sonner";

import { ColumnDef } from "@tanstack/react-table";

export type heroBannerImageColumns = {
  link: string;
  image: File | string;
  deleteImageData: () => Promise<number> | void;
  client_created_at?: number;
};

export const heroBannerColumns: ColumnDef<heroBannerImageColumns>[] = [
  {
    accessorKey: "link",
    header: "Link",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <div className="float-left">
          <Image
            width={100}
            height={100}
            className="mx-auto w-32"
            src={
              typeof row.original.image === "string"
                ? `/api/banners/${row.original.image}`
                : URL.createObjectURL(row.original.image)
            }
            alt="no data"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "Actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <button
            className="p-2 bg-red-500 text-white rounded-none"
            onClick={async () => {
              const response = await row.original.deleteImageData();
              console.log(response);
              if (response === 200) {
                toast.success("Image Deleted");
              } else {
                toast.error("Image Not Deleted");
              }
            }}
          >
            Delete
          </button>
        </div>
      );
    },
  },
];
