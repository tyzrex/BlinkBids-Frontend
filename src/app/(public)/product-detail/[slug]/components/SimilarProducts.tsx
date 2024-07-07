import { Suspense } from "react";

import { goTry } from "go-go-try";

import { getSimilarProducts } from "@/api/getProductDetail";
import ProductsSwiper from "@/app/(public)/_components/Swipers/product-swiper";

interface ICategory {
  category: string;
}

const Categories = async (props: ICategory) => {
  const [error, similarProducts] = await goTry(
    getSimilarProducts(props.category)
  );

  if (error || !similarProducts) {
    return <div>No Similar Products Found</div>;
  }

  return (
    <>
      <ProductsSwiper data={similarProducts} />
    </>
  );
};

export default function SimilarProducts({ slug }: { slug: string }) {
  return (
    <section className="h-auto mx-auto mb-10 relative">
      <div className="w-full">
        <div className="flex-between">
          <h2 className="title-typography mb-5">Similar Products</h2>
        </div>

        <Suspense
          fallback={
            <div className="flex-center ">
              <span className="loader h-60 flex-center w-full"></span>
            </div>
          }
        >
          <Categories category={slug} />
        </Suspense>
      </div>
    </section>
  );
}
