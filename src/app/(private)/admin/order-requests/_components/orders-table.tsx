import { getServerSession } from "next-auth";

import { getAllOrders } from "@/api/cms";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { DataTable } from "../../products/_components/datatable";
import { columns } from "./columns";

export default async function OrdersTable({
  currentPage,
}: {
  currentPage: any;
}) {
  const session = await getServerSession(options);
  const page = parseInt(currentPage) || 1;
  const orders = await getAllOrders(session, currentPage);

  if (orders?.error)
    return <ErrorComponent error={orders?.error} message={orders?.message} />;

  return (
    <>
      <div>
        <div className="py-5">
          <h1 className="title-typography">All Orders</h1>
        </div>

        <DataTable
          columns={columns}
          data={orders.results}
          addPage="/category/add-category"
        />
        <Pagination
          currentPage={page}
          total_pages={orders.total_pages}
          next={orders.next}
          previous={orders.previous}
          path="/admin/order-requests"
        />
      </div>
    </>
  );
}
