"use client";

import { ImageWithFallback } from "@/app/(public)/_components/Resusables/image-with-fallback";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export type MediaLibraryColumns = {
  id: number;
  name: string;
  image: string | null;
  created_at: string;
};

export const mediaLibColumns: ColumnDef<MediaLibraryColumns>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => (
      <ImageWithFallback
        fallback="/placeholder.jpg"
        src={
          row.original.image
            ? `/api/media-library/${row.original.image?.split("/").pop()}` ||
              "/placeholder.jpg"
            : "/placeholder.jpg"
        }
        alt={row.original.name}
        className="aspect-video "
        height={100}
        width={100}
      />
    ),
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    cell: ({ row }) => (
      <span>{format(new Date(row.original.created_at), "yyyy/MM/dd")}</span>
    ),
  },
  {
    header: "Actions",
    accessorKey: "id",
    cell: ({ row }) => (
      <div className="flex text-xl items-center gap-5">
        <Link href={`/admin/media-library/${row.original.id}`}>
          <AiOutlineDelete />
        </Link>
      </div>
    ),
  },
];
