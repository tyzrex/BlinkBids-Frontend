import { getServerSession } from "next-auth";

import { getAllEmiRequests } from "@/api/cms";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { DataTable } from "../../products/_components/datatable";
import { columns } from "./columns";

export default async function EMITable({ currentPage }: { currentPage: any }) {
  const session = await getServerSession(options);
  const page = parseInt(currentPage) || 1;
  const { emiRequests, error } = await getAllEmiRequests(session, currentPage);
  // console.log(emiRequests);

  const data = emiRequests?.results ?? [];

  return (
    <>
      <div className="py-5">
        <h1 className="title-typography">Product emiRequests</h1>
      </div>

      <DataTable
        columns={columns}
        data={data}
        addPage="/category/add-category"
      />
      {data && data.length > 0 && (
        <Pagination
          currentPage={page}
          total_pages={emiRequests.total_pages}
          next={emiRequests.next}
          previous={emiRequests.previous}
          path="/admin/emi-requests"
        />
      )}
    </>
  );
}
