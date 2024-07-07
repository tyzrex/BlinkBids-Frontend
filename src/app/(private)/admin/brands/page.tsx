import { Suspense } from "react";
import BrandTable from "./_components/brand-table";

interface IProductsPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Products(props: IProductsPage) {
  const currentPage = parseInt(props?.searchParams?.page as string) || 1;
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-full">
            <span className="loader"></span>
          </div>
        }
      >
        <BrandTable currentPage={currentPage} />
      </Suspense>
    </>
  );
}
