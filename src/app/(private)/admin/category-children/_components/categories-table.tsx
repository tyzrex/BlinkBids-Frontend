import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { getChildCategories } from "@/api/cms";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { DataTable } from "../../products/_components/datatable";
import { columns } from "./columns";

export default async function CategoriesTable({
  currentPage,
}: {
  currentPage: any;
}) {
  const session = await getServerSession(options);
  const page = parseInt(currentPage) || 1;
  const [error, categories] = await goTry(getChildCategories(session, page));

  if (error || !categories)
    return (
      <ErrorComponent error={"404"} message={"Failed Fetching Categories"} />
    );

  return (
    <>
      <div>
        <div className="py-5">
          <h1 className="title-typography">Product Clildren Categories</h1>
        </div>

        <DataTable
          columns={columns}
          data={categories?.results}
          addPage="/category-children/add-category"
          goToLink="Add Category"
          navigator={true}
          searchColumn="name"
        />
        <Pagination
          currentPage={page}
          total_pages={categories.total_pages}
          next={categories.next}
          previous={categories.previous}
          path="/admin/category-children"
        />
      </div>
    </>
  );
}
