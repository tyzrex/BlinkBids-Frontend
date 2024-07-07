import { Suspense } from "react";

import ProductTable from "./_components/ProductTable";

interface IProductsPage {
  searchParams: {
    page: string;
  };
}

export default async function Products(props: IProductsPage) {
  const currentPage = parseInt(props?.searchParams?.page) || 1;

  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full">
            <span className="loader"></span>
          </div>
        }
      >
        <ProductTable currentPage={currentPage} />
      </Suspense>
    </>
  );
}
