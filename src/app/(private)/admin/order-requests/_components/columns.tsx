"use client";;
import { format } from "date-fns";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import PaymentStatusBadge from "@/app/(private)/user/_components/payment-method-badge";
import OrderPaymentStatusChip from "@/app/(private)/user/_components/order-payment-status-chip";

export type ProductTableColumns = {
  id: number;
  time_ordered: Date;
  status: string;
  payment_method: string;
  price: number;
  pub_id: string;
  name: string;
  email: string;
  payment_status: boolean;
};

export const columns: ColumnDef<ProductTableColumns>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
  },
  {
    accessorKey: "pub_id",
    header: "Public Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "payment_status",
    header: "Payment Status",
    cell: ({ row }) => {
      return <OrderPaymentStatusChip row={row} />;
    },
  },
  {
    accessorKey: "time_ordered",
    header: "Time Ordered",
    cell: ({ row }) => {
      return (
        <div>
          <span>
            <>
              {format(new Date(row.original.time_ordered), "dd-MM-yyyy,hh:mm")}
            </>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => {
      return (
        <div>
          <span>Rs. {row.original.price}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => {
      return (
        <>
          <PaymentStatusBadge status={row.original.payment_method} />
        </>
      );
    },
  },

  {
    accessorKey: "Details",
    header: "Details",
    cell: ({ row }) => {
      return (
        <div>
          <Link
            href={`/admin/order-requests/order-detail/${row.original.id}`}
            className="text-accent-2 hover:text-gray-900"
          >
            Show Details
          </Link>
        </div>
      );
    },
  },
];
