import { getServerSession } from "next-auth";

import { getAllProducts } from "@/api/cms";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { columns } from "./columns";
import { DataTable } from "./datatable";

interface Props {
  currentPage: number;
}
export default async function ProductTable(props: Props) {
  const session = await getServerSession(options);
  const currentPage = props?.currentPage;
  const products = await getAllProducts(session, currentPage);

  if (products?.error)
    return (
      <ErrorComponent error={products?.error} message={products?.message} />
    );

  return (
    <div>
      <div className="py-5">
        <h1 className="title-typography">All Products</h1>
      </div>

      <DataTable
        columns={columns}
        data={products.results}
        addPage="/products/add-product"
        goToLink="Add Products"
        navigator={true}
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
