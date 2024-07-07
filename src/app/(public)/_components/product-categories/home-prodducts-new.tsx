import { Suspense } from "react";

import Link from "next/link";

import { getHomeProductsByCategory } from "@/api/homeApi";
import { cn } from "@/lib/utils";

import ProductsSwiper from "../Swipers/product-swiper";
import { goTry } from "go-go-try";
import SectionLoader from "../loaders/section-loaders";

interface IHomeProductsProps {
  name: string;
  category: string;
  className?: "middle-text-title-typography" | "title-typography";
  newProducts: any;
}

const HomeProductsNew = (props: IHomeProductsProps) => {
  return (
    <>
      <Suspense fallback={<SectionLoader />} key={props.category}>
        <section className="h-auto mx-auto my-6 sm:mt-10 relative">
          <div className={"w-full relative"}>
            <div className="w-full flex items-center justify-between">
              <p className={cn(props.className, "mb-5")}>{props.name}</p>

              {props.name !== "New Arrivals" && (
                <Link
                  href={`/category/${props.newProducts.category_slug}`}
                  prefetch={false}
                  className={
                    props.className === "middle-text-title-typography"
                      ? "hidden"
                      : "absolute right-0 top-1"
                  }
                >
                  <button className="text-[10px] lg:text-[14px] text-accent-2 font-semibold underline">
                    <span>More Products</span>
                  </button>
                </Link>
              )}
            </div>

            <Suspense
              fallback={
                <div className="flex-center ">
                  <span className="loader h-60 flex-center w-full"></span>
                </div>
              }
            >
              <ProductsSwiper data={props.newProducts} name={props.name} />
            </Suspense>
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default HomeProductsNew;
