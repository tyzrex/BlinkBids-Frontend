import { getServerSession } from "next-auth";

import { getAllBrands } from "@/api/cms";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { DataTable } from "../../products/_components/datatable";
import { columns } from "./columns";

export default async function BrandTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const session = await getServerSession(options);
  const page = currentPage;
  const brands = await getAllBrands(session, currentPage);
  if (brands?.error)
    return <ErrorComponent error={brands?.error} message={brands?.message} />;

  return (
    <>
      <div>
        <div className="py-5">
          <h1 className="title-typography">Product Brands</h1>
        </div>

        <DataTable
          columns={columns}
          data={brands.results}
          addPage="/brands/add-brand"
          goToLink="Add Brand"
          navigator={true}
          searchColumn="name"
        />
        <Pagination
          currentPage={page}
          total_pages={brands.total_pages}
          next={brands.next}
          previous={brands.previous}
          path="/admin/brands"
        />
      </div>
    </>
  );
}
