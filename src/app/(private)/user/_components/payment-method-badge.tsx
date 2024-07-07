import PaymentBadge from "@/app/(public)/_components/Resusables/payment-badge";

export default function PaymentStatusBadge({ status }: { status: string }) {
  return (
    <>
      {status === "cod" ? (
        <PaymentBadge status="Cash on Delivery" />
      ) : status === "khalti" ? (
        <PaymentBadge status="Khalti" />
      ) : status === "esewa" ? (
        <PaymentBadge status="Esewa" />
      ) : (
        <PaymentBadge status="Cash on Delivery" />
      )}
    </>
  );
}
