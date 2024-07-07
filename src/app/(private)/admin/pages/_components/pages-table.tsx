import { getAllPages } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";
import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";
import { DataTable } from "../../products/_components/datatable";
import { pagesColumns } from "./pages-columns";
import Pagination from "@/app/(public)/search/components/pagination";

interface Props {
  currentPage: number;
}

export default async function PagesTable(props: Props) {
  const session = await getServerSession(options);
  const currentPage = props?.currentPage;
  const [error, pageData] = await goTry(getAllPages(session, currentPage));

  if (error || !pageData) {
    return <ErrorComponent error={"error"} message="Error" />;
  }

  return (
    <>
      <div className="py-5">
        <h2 className="title-typography">Page Data</h2>
      </div>
      <DataTable
        columns={pagesColumns}
        data={pageData.results}
        navigator={true}
        goToLink="Add Page Data"
        searchColumn="name"
        addPage="pages/add-page"
      />
      <Pagination
        currentPage={currentPage}
        total_pages={pageData.total_pages}
        next={pageData.next}
        previous={pageData.previous}
        path="/admin/pages"
      />
    </>
  );
}
