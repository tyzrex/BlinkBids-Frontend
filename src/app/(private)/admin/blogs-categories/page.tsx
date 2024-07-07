import { Suspense } from "react";
import BlogCategoriesTable from "./_components/blog-table";

interface IBlogPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page(props: IBlogPage) {
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
        <BlogCategoriesTable currentPage={currentPage} />
      </Suspense>
    </>
  );
}
