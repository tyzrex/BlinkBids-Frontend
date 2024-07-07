import StatusBadge from "@/app/(public)/_components/Resusables/status-badge";

const statusButtonConstants = {
  false: "bg-red-500",
  true: "bg-emerald-500",
} as const;

export default function OrderPaymentStatusChip({
  row,
}: {
  row: { original: { payment_status: boolean } };
}) {
  return (
    <>
      {row.original.payment_status ? (
        <StatusBadge status="true" />
      ) : (
        <StatusBadge status="false" />
      )}
    </>
  );
}
