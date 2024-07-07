import StatusBadge from "@/app/(public)/_components/Resusables/status-badge";

export default function EMIStatusBadge({ status }: { status: string }) {
  return (
    <>
      {status === "pending" ? (
        <StatusBadge status="Pending" />
      ) : status === "confirmed" ? (
        <StatusBadge status="Confirmed" />
      ) : status === "canceled" ? (
        <StatusBadge status="Cancelled" />
      ) : status === "completed" ? (
        <StatusBadge status="Completed" />
      ) : status === "approved" ? (
        <StatusBadge status="Approved" />
      ) : (
        <StatusBadge status="Pending" />
      )}
    </>
  );
}
