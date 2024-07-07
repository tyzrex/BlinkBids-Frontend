import { Suspense } from "react";

import { homeBrandSwiperData, mapResponseToObject } from "@/lib/constants";

import CategoriesSwiper from "../Swipers/desktop-category-slider";
import { serverProtectedRequest } from "@/services/serverRequest";
import MobileCategorySwiper from "../Swipers/mobile-category-swiper";
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
  return <MobileCategorySwiper data={categories} />;
};

const MobileProductCategories = () => {
  return (
    <section className="block sm:hidden h-auto mx-auto my-6 sm:my-10 relative">
      <div className="w-full">
        <span className="title-typography ">Popular Categories</span>

        <Suspense fallback={<CategoriesLoader />}>
          <Categories />
        </Suspense>
      </div>
    </section>
  );
};

export default MobileProductCategories;
