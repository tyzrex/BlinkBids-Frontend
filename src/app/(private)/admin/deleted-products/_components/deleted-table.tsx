import { getServerSession } from "next-auth";

import { getAllProducts, getDeletedProducts } from "@/api/cms";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { columns } from "./deleted-columns";
import { DataTable } from "../../products/_components/datatable";
import { goTry } from "go-go-try";

interface Props {
  currentPage: number;
}
export default async function DeletedProductTable(props: Props) {
  const session = await getServerSession(options);
  const currentPage = props?.currentPage;
  const [error, products] = await goTry(
    getDeletedProducts(session, currentPage)
  );

  if (error || !products)
    return (
      <ErrorComponent error={products?.error} message={products?.message} />
    );

  return (
    <div>
      <div className="py-5">
        <h1 className="title-typography">Soft Deleted Products</h1>
      </div>

      <DataTable
        columns={columns}
        data={products.results}
        searchColumn="name"
      />
      <Pagination
        currentPage={currentPage}
        total_pages={products.total_pages}
        next={products.next}
        previous={products.previous}
        path="/admin/products"
      />
    </div>
  );
}
