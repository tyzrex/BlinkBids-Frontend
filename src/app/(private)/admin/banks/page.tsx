import { Suspense } from "react";

import BanksTable from "./_components/banks-table";

interface IProductsPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Products(props: IProductsPage) {
  const currentPage = props?.searchParams?.page;
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full">
            <span className="loader"></span>
          </div>
        }
      >
        <BanksTable currentPage={currentPage} />
      </Suspense>
    </>
  );
}
