import Image from "next/image";
import Link from "next/link";
import FatafatLogo from "public/fatafat.png";

import { getOrderDetail } from "@/api/actions";
import OrderStatusBadge from "@/app/(private)/user/_components/order-status";
import PaymentStatusBadge from "@/app/(private)/user/_components/payment-method-badge";
import InvoiceTable from "./_components/InvoiceTable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Status from "../../_components/status";

type OrderDetail = {
  params: {
    id: number;
  };
};

export type OrderDetailResponse = {
  id: number;
  time_ordered: Date;
  status: string;
  quantity: number;
  payment_method: string;
  payment_status: boolean;
  address: string;
  district: string;
  address_description: string;
  phone: string;
  price: number;
  pub_id: string;
  user: number;
  products: ProductDetail[];
  name: string;
  email: string;
};

interface ProductDetail {
  id: number;
  quantity: number;
  name: string;
  order: number;
  price: number;
  product: number;
}

export default async function OrderInvoice(props: OrderDetail) {
  const orderDetail = await getOrderDetail(props.params.id);
  if (orderDetail.error) return <div>error</div>;

  const customerOrder: OrderDetailResponse = orderDetail.results[0];

  return (
    <>
      <div className="flex-between">
        <div className="py-5">
          <h1 className="title-typography">Order Invoice</h1>
        </div>

        <Link href="/admin/order-requests" prefetch={false}>
          <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-accent-2 rounded-md hover:bg-gray-700 focus:outline-none ">
            Back to All Orders
          </button>
        </Link>

        {/* print invoice button */}
      </div>
      <div className="mx-auto py-16 bg-white">
        <article className="overflow-hidden">
          <div className="bg-[white] rounded-b-md">
            <div className="px-9">
              <div className="mb-10">
                <div className="flex flex-col items-start">
                  <h2 className="text-black">Order ID: {props.params.id}</h2>
                  <h6 className="text-sm font-bold text-black">
                    Public Order ID: {customerOrder.pub_id}
                  </h6>
                  <h6 className="text-sm font-bold text-black">
                    Order Date:{" "}
                    {new Date(customerOrder.time_ordered).toDateString()}
                  </h6>
                </div>
                <div className="flex items-center justify-between mt-4">
                  {/* order status and the mode of payment */}
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <p className="text-sm font-normal text-black mr-3">
                        Status:
                      </p>
                      <OrderStatusBadge status={customerOrder.status} />
                    </div>
                    <div className="flex items-center ml-4">
                      <p className="text-sm font-normal text-black mr-3">
                        Payment Method:
                      </p>
                      <PaymentStatusBadge
                        status={customerOrder.payment_method}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-flow-row grid-cols-3  p-9 gap-10">
              <div className="gap-4 col-span-3 xl:col-span-2">
                <InvoiceTable customerOrder={customerOrder} />
              </div>
              <div className="flex flex-col gap-5">
                <Card className="col-span-3 xl:col-span-1">
                  <CardHeader>
                    <CardTitle>Customer Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="font-medium">
                        Name: {customerOrder.name}
                      </div>
                      <div>Address: {customerOrder.address}</div>
                      <div>Phone: {customerOrder.phone}</div>
                      <div>Email: {customerOrder.email}</div>
                      <div>District: {customerOrder.district}</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Change Order Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-normal text-black mr-3">
                        Change Status:
                      </p>

                      <Status
                        row={{
                          original: {
                            id: customerOrder.id,
                            status: customerOrder.status,
                          },
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4 col-span-3 xl:col-span-2">
                  <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-accent-1 rounded-md hover:bg-gray-700 focus:outline-none ">
                    Download Invoice
                  </button>
                  <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-accent-2 rounded-md hover:bg-gray-700 focus:outline-none ">
                    Print Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
