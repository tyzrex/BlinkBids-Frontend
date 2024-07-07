import { Badge } from "@/components/ui/badge";

export default function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={
        status === "Pending"
          ? "bg-yellow-500"
          : status === "Delivered"
          ? "bg-lime-500"
          : status === "Cancelled"
          ? "bg-red-500"
          : status === "Confirmed"
          ? "bg-emerald-500"
          : status === "Approved"
          ? "bg-emerald-500"
          : status === "Completed"
          ? "bg-lime-500"
          : status === "Refunded"
          ? "bg-orange-500"
          : status === "true"
          ? "bg-emerald-500"
          : status === "false"
          ? "bg-red-500"
          : "bg-yellow-500"
      }
    >
      {status}
    </Badge>
  );
}
