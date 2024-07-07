"use client";

import { toast } from "sonner";

import { updateOrderStatus } from "@/api/actions";
import StatusBadge from "@/app/(public)/_components/Resusables/status-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showErrorToasts } from "@/lib/utils";
import { useRouter } from "next/navigation";

const statusButtonConstants = {
  pending: "bg-yellow-500",
  confirmed: "bg-emerald-500",
  cancelled: "bg-red-500",
  delivered: "bg-lime-500",
  refunded: "bg-orange-500",
} as const;

export default function Status({
  row,
}: {
  row: { original: { status: string; id: number } };
}) {
  const router = useRouter();
  const updateStatus = async (status: string) => {
    const response = await updateOrderStatus(row.original.id, status);
    if (response.success === true) {
      toast.success(response.message);
      router.refresh();
    } else {
      showErrorToasts(response.errorData);
    }
  };

  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {row.original.status === "pending" ? (
              <StatusBadge status="Pending" />
            ) : row.original.status === "confirmed" ? (
              <StatusBadge status="Confirmed" />
            ) : row.original.status === "cancelled" ? (
              <StatusBadge status="Cancelled" />
            ) : row.original.status === "delivered" ? (
              <StatusBadge status="Delivered" />
            ) : row.original.status === "refunded" ? (
              <StatusBadge status="Refunded" />
            ) : (
              <StatusBadge status="Pending" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
            {Object.keys(statusButtonConstants).map((status, idx: number) => {
              return (
                <DropdownMenuItem
                  key={idx}
                  className="cursor-pointer"
                  onClick={() => updateStatus(status)}
                >
                  <div>{status}</div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
