import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { getAllBanks } from "@/api/cms";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { DataTable } from "../../products/_components/datatable";
import { bankColumns } from "./banks-columns";

export default async function BanksTable({
  currentPage,
}: {
  currentPage: any;
}) {
  const session = await getServerSession(options);
  const page = parseInt(currentPage) || 1;
  const [error, banks] = await goTry(getAllBanks(session, currentPage));

  if (error || !banks)
    return (
      <ErrorComponent message="Error fetching banks" error={"404 not found"} />
    );

  console.log(banks);

  return (
    <>
      <div>
        <div className="py-5">
          <h1 className="title-typography">EMI Available Banks</h1>
        </div>

        <DataTable
          columns={bankColumns}
          data={banks.results}
          addPage="/banks/add-bank"
          goToLink="Add New Bank"
          navigator={true}
          searchColumn="name"
        />
        <Pagination
          currentPage={page}
          total_pages={banks.total_pages}
          next={banks.next}
          previous={banks.previous}
          path="/admin/banks-type"
        />
      </div>
    </>
  );
}
