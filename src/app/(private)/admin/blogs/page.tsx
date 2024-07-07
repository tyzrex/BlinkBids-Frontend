import { Suspense } from "react";
import Blogtable from "./_components/blog-table";

interface IBlogPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Products(props: IBlogPage) {
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
        <Blogtable currentPage={currentPage} />
      </Suspense>
    </>
  );
}
