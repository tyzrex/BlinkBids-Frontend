import { getServerSession } from "next-auth";

import { getUserOrders } from "@/api/user";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { DataTable } from "../../admin/products/_components/datatable";
import { columns } from "../_components/order-columns";

type TOrderProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function MyOrdersPage(props: TOrderProps) {
  const currentPage = parseInt(props?.searchParams?.page as string) || 1;

  const session = await getServerSession(options);
  const myOrders = await getUserOrders(session, currentPage);

  if (myOrders?.error)
    return (
      <ErrorComponent error={myOrders?.error} message={myOrders?.message} />
    );

  console.log(myOrders);
  return (
    <>
      <div className="py-10 w-full">
        <h3 className="title-typography">My Orders</h3>

        <div className="w-full">
          <DataTable columns={columns} data={myOrders} />
        </div>
      </div>
    </>
  );
}
