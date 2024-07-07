import StatusBadge from "@/app/(public)/_components/Resusables/status-badge";

export default function OrderStatusBadge({ status }: { status: string }) {
  return (
    <>
      {status === "pending" ? (
        <StatusBadge status="Pending" />
      ) : status === "confirmed" ? (
        <StatusBadge status="Confirmed" />
      ) : status === "cancelled" ? (
        <StatusBadge status="Cancelled" />
      ) : status === "delivered" ? (
        <StatusBadge status="Delivered" />
      ) : status === "refunded" ? (
        <StatusBadge status="Refunded" />
      ) : (
        <StatusBadge status="Pending" />
      )}
    </>
  );
}
