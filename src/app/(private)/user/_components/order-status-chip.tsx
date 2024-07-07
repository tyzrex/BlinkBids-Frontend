import StatusBadge from "@/app/(public)/_components/Resusables/status-badge";

const statusButtonConstants = {
  pending: "bg-yellow-500",
  confirmed: "bg-emerald-500",
  cancelled: "bg-red-500",
  completed: "bg-lime-500",
} as const;

export default function OrderStatusChip({
  row,
}: {
  row: { original: { status: string; id: number } };
}) {
  return (
    <>
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
    </>
  );
}
