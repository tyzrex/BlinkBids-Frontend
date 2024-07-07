import { Suspense } from "react";

import { mapResponseToObject } from "@/lib/constants";

import CategoriesSwiper from "../Swipers/desktop-category-slider";
import { serverProtectedRequest } from "@/services/serverRequest";
import CategoriesLoader from "../loaders/categories-loader";

async function getProductCategories() {
  const response = await serverProtectedRequest(
    `products/category/all`,
    "GET",
    null
  );
  return response?.data;
}

const Categories = async () => {
  const categories = await getProductCategories();

  return (
    <>
      <div>
        <CategoriesSwiper data={categories} />
      </div>
    </>
  );
};

const ProductCategories = () => {
  return (
    <section className="hidden sm:block h-auto mx-auto my-5 sm:my-10 relative">
      <div className="w-full">
        <span className="middle-text-title-typography mb-5">
          Popular Categories
        </span>

        <Suspense fallback={<CategoriesLoader />}>
          <Categories />
        </Suspense>
      </div>
    </section>
  );
};

export default ProductCategories;
