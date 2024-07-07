import { Suspense } from "react";

import { searchProducts } from "@/api/search";
import ErrorComponent from "@/components/Error";

import SearchFilterModel from "./components/filter-model";
import Pagination from "./components/pagination";
import { ProductGrid } from "./components/product-grid";
import FilterComponent from "./components/search-filter";
import SortProducts from "./components/sort-products";
import Loading from "./loading";

interface ISearchProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(props: ISearchProps) {
  const searchQuery = props?.searchParams?.query;

  const products = await searchProducts(props.searchParams);

  if (products.error) {
    return {
      title: "Product Not Found",
      description: "Product Not Found",
      keywords: "Product Not Found",
    };
  }

  const defaultTitle = `Search for ${searchQuery} - fatafatsewa.com`;
  const defaultDescription = `Search for ${searchQuery} - fatafatsewa.com`;
  const defaultKeywords = `Search for ${searchQuery} - fatafatsewa.com`;

  const title = defaultTitle;
  const description = defaultDescription;
  const keywords = defaultKeywords;

  const canonicalUrl = `/search?query=${searchQuery}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

const SearchPageContent = async (props: ISearchProps) => {
  const searchQuery = props?.searchParams?.query;

  const products = await searchProducts(props.searchParams);
  console.log(products);

  if (products.error) {
    return <ErrorComponent message="Product Not Found" error={"Error 404"} />;
  }

  const currentPage = props?.searchParams?.page;
  return (
    <div className="max-w-layout ">
      <div
        className="flex flex-col items-center gap-6 justify-center
        
       md:flex-row md:items-center md:justify-between md:text-left md:gap-0 py-6"
      >
        <div className="w-full">
          <div className="flex-between mb-5">
            <h1 className="title-typography ">
              {" "}
              You searched for {searchQuery}
            </h1>
          </div>
          <div className="flex-between">
            <p className="text-gray-600">{products?.count} products found</p>
            <SortProducts query={searchQuery} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
        <div className="w-full h-full ">
          <ProductGrid data={products?.results} />

          {products?.count === 0 && (
            <ErrorComponent message="Product Not Found" error={"Error 404"} />
          )}

          <div className="w-full">
            {products?.count > 0 && (
              <Pagination
                currentPage={currentPage ? parseInt(currentPage as string) : 1}
                query={searchQuery}
                total_pages={products?.total_pages}
                next={products?.next}
                path={`/search`}
                indexPath={`&query=${searchQuery}`}
                previous={products?.previous}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function SearchPage(props: ISearchProps) {
  const searchQuery = props?.searchParams?.query;
  const brandQuery = props?.searchParams?.brand;
  return (
    <>
      <Suspense
        fallback={<Loading />}
        key={((searchQuery as string) + brandQuery) as string}
      >
        <SearchPageContent {...props} />
      </Suspense>
    </>
  );
}
