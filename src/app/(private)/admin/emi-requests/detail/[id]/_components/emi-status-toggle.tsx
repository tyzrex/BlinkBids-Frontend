"use client";

import { toast } from "sonner";

import { updateEMIStatus, updateOrderStatus } from "@/api/actions";
import StatusBadge from "@/app/(public)/_components/Resusables/status-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showErrorToasts, statusMapper } from "@/lib/utils";
import {
  Status,
  statusButtonConstants,
  validTransitions,
} from "@/lib/constants";

export default function EMIStatusToggle({
  id,
  currentStatus,
}: {
  id: number;
  currentStatus: string;
}) {
  const updateStatus = async (currentStatus: Status, toggledStatus: Status) => {
    // Validate the transition
    if (!validTransitions[currentStatus].includes(toggledStatus)) {
      toast.error(
        `Invalid transition from ${currentStatus} to ${toggledStatus}.`
      );
      return;
    }

    try {
      const response = await updateEMIStatus(id, toggledStatus);
      if (response.success) {
        toast.success(response.message);
        // Optionally, update local state or context to reflect the new status
      } else {
        showErrorToasts(response.errorData);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status due to an error.");
    }
  };

  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {currentStatus === "pending" ? (
              <StatusBadge status="Pending" />
            ) : currentStatus === "approved" ? (
              <StatusBadge status="Approved" />
            ) : currentStatus === "confirmed" ? (
              <StatusBadge status="Confirmed" />
            ) : currentStatus === "completed" ? (
              <StatusBadge status="Completed" />
            ) : currentStatus === "canceled" ? (
              <StatusBadge status="Cancelled" />
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
                  onClick={() =>
                    updateStatus(
                      statusMapper(currentStatus),
                      statusMapper(status)
                    )
                  }
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
