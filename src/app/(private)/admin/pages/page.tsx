import { Suspense } from "react";
import PagesTable from "./_components/pages-table";

interface IAdminPages {
  searchParams: {
    page: string;
  };
}

export default async function Products(props: IAdminPages) {
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
        <PagesTable currentPage={currentPage} />
      </Suspense>
    </>
  );
}
