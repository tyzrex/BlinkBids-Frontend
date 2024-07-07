import CircleLoader from "@/components/ui/CircleLoader";
import { Suspense } from "react";
import OrdersTable from "./_components/orders-table";

interface IOrdersPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page(props: IOrdersPage) {
  const currentPage = props?.searchParams?.page;
  return (
    <>
      <Suspense fallback={<CircleLoader />}>
        <OrdersTable currentPage={currentPage} />
      </Suspense>
    </>
  );
}
