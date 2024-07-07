import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { getAllBlogs } from "@/api/cms";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { DataTable } from "../../products/_components/datatable";
import { columns } from "./columns";

export default async function Blogtable({ currentPage }: { currentPage: any }) {
  const session = await getServerSession(options);
  const page = parseInt(currentPage) || 1;
  const [error, blogs] = await goTry(getAllBlogs(session, currentPage));
  if (error || !blogs)
    return <ErrorComponent error={"404"} message={"Failed Fetching Blogs"} />;

  return (
    <>
      <div>
        <div className="py-5">
          <h1 className="title-typography">Blogs</h1>
        </div>

        <DataTable
          columns={columns}
          data={blogs.results}
          goToLink="Add New Blog"
          addPage="/blogs/add-blog"
          navigator={true}
          searchColumn="title"
        />
        <Pagination
          currentPage={page}
          total_pages={blogs.total_pages}
          next={blogs.next}
          previous={blogs.previous}
          path="/admin/blogs"
        />
      </div>
    </>
  );
}
