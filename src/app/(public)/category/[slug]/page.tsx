import { Suspense } from "react";

import { notFound } from "next/navigation";

import { getProductsByType } from "@/api/productType";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CardLoader from "../../_components/Resusables/card-loader";
import Pagination from "../../search/components/pagination";
import { IProductCardsProps } from "../../types/home";
import { goTry } from "go-go-try";
import FilterComponent from "../../search/components/search-filter";
import SearchFilterModel from "../../search/components/filter-model";
import ProductCards from "../../_components/Resusables/product-card";
import { ProductGrid } from "../../search/components/product-grid";
import ErrorComponent from "@/components/Error";
import { EmptyCard } from "@/app/(private)/admin/components/empty-card";
import { GenericEmptyCard } from "@/app/(private)/admin/components/dynamic-empty-card";
import { getHomeProductsByCategory } from "@/api/homeApi";

interface ISearchProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function CategoryPageFetcher(props: ISearchProps) {
  const query = props?.params?.slug;

  if (!query) {
    return notFound();
  }

  const page = props?.searchParams?.page;
  const [error, products] = await goTry(
    getHomeProductsByCategory({ category: query })
  );

  if (!products || error) {
    return notFound();
  }

  console.log(products);

  return (
    <main className="max-w-layout ">
      <div className="flex-between py-6">
        <div>
          <h1 className="page-title-typography mb-5">
            {query?.replace(/-/g, " ")}
          </h1>
          <p className="text-gray-600">{products?.count} products found</p>
        </div>
        <div className="lg:hidden">
          <SearchFilterModel brands={products?.brands} query={query} />
        </div>
        {/* <div className="hidden flex-center">
          <div className="flex-center gap-2">
            <span className="text-gray-600">Sort by</span>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select filter</SelectLabel>
                  <SelectItem value="new">New</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div> */}
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
        <div className="w-full h-full ">
          <ProductGrid data={products?.results} />

          {products?.count === 0 && (
            <GenericEmptyCard
              className="w-full px-0 border-none shadow-none "
              title="No products found"
              description="No products found for this category"
            />
          )}

          <div className="w-full">
            {products?.count > 0 && (
              <Pagination
                currentPage={parseInt(page as string) || 1}
                query={query}
                total_pages={products?.num_pages}
                next={products?.next}
                previous={products?.previous}
                path={`/category/${query}`}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default async function CategoryPage(props: ISearchProps) {
  return (
    <>
      <Suspense
        fallback={
          <div className="max-w-layout mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <CardLoader key={index} />
              ))}
          </div>
        }
      >
        <CategoryPageFetcher
          params={props.params}
          searchParams={props.searchParams}
        />
      </Suspense>
    </>
  );
}
