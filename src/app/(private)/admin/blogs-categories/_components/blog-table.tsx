import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { getBlogCategories } from "@/api/cms";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { DataTable } from "../../products/_components/datatable";
import { blogColumns } from "./blog-table-columns";

export default async function BlogCategoriesTable({
  currentPage,
}: {
  currentPage: any;
}) {
  const session = await getServerSession(options);
  const page = parseInt(currentPage) || 1;
  const [error, blogCategories] = await goTry(
    getBlogCategories(session, currentPage)
  );

  console.log(blogCategories);
  if (error || !blogCategories)
    return (
      <ErrorComponent
        error={"404"}
        message={"Failed Fetching Blog Categories"}
      />
    );

  return (
    <>
      <div>
        <div className="py-5">
          <h1 className="title-typography">Blog Categories</h1>
        </div>

        <DataTable
          columns={blogColumns}
          data={blogCategories.results}
          addPage="/blogs-categories/add-blog-category"
          navigator={true}
          goToLink="Add Blog Category"
          searchColumn="title"
        />
        <Pagination
          currentPage={page}
          total_pages={blogCategories.total_pages}
          next={blogCategories.next}
          previous={blogCategories.previous}
          path="/admin/blog-categories"
        />
      </div>
    </>
  );
}
