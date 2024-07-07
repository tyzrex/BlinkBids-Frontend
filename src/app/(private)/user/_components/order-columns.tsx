"use client";

import { formatTimestamp } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import OrderPaymentStatusChip from "./order-payment-status-chip";
import OrderStatusChip from "./order-status-chip";
import { format } from "date-fns";
import PaymentStatusBadge from "./payment-method-badge";

export type ProductTableColumns = {
  id: number;
  price: number;
  status: string;
  payment_method: string;
  payment_status: boolean;
  time_ordered: string;
};

export const columns: ColumnDef<ProductTableColumns>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => {
      return <OrderStatusChip row={row} />;
    },
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => {
      return <PaymentStatusBadge status={row.original.payment_method} />;
    },
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
          {format(new Date(row.original.time_ordered), "dd-MM-yyyy,hh:mm")}
        </div>
      );
    },
  },
];
