"use client";

import { formatTimestamp } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import OrderPaymentStatusChip from "./order-payment-status-chip";
import OrderStatusChip from "./order-status-chip";
import { format } from "date-fns";
import PaymentStatusBadge from "./payment-method-badge";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<any>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "total_price",
    header: "Price",
  },

  {
    accessorKey: "is_paid",
    header: "Payment Status",
    cell: ({ row }) => {
      return <Badge>{row.original.is_paid ? "Paid" : "Unpaid"}</Badge>;
    },
  },

  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => {
      return <PaymentStatusBadge status={row.original.payment_method} />;
    },
  },
];
