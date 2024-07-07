import { Badge } from "@/components/ui/badge";

export default function PaymentBadge({ status }: { status: string }) {
  return (
    <Badge
      className={
        status === "khalti"
          ? "bg-purple-500"
          : status === "esewa"
          ? "bg-emerald-500"
          : status === "cod"
          ? "bg-blue-500"
          : status === "Cash on Delivery"
          ? "bg-blue-500"
          : status === "Khalti"
          ? "bg-purple-500"
          : status === "Esewa"
          ? "bg-emerald-500"
          : "bg-blue-500"
      }
    >
      {status}
    </Badge>
  );
}
