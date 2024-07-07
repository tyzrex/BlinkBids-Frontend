import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { getProductDetail } from "@/api/getProductDetail";

import Ratings from "../../_components/review-rating/rating-reviews";
import Breadcrumb from "./components/Breadcrumb";
import Gallery from "./components/Gallery";
import ProductDescription from "./components/ProductDescription";
import SimilarProducts from "./components/SimilarProducts";
import ProductsSwiper from "../../_components/Swipers/product-swiper";
import OrderButtons from "./components/bottom-order";
import { goTry } from "go-go-try";
import HomeProducts from "../../_components/product-categories/home-products";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    tab?: "description" | "specification" | "reviews";
  };
};

export default async function ProductDetail({ params }: Props) {
  const productDetails = await getProductDetail(params.slug);
  console.log(productDetails);
  if (!productDetails) {
    redirect("/404");
  }
  // console.log(productDetails);
  const {
    id,
    title,
    category_name,
    images,
    description,
    price,
    sku,
    discounted_price,
  } = productDetails;

  return (
    <>
      <div className="max-w-layout relative">
        <Gallery
          id={id}
          images={images || []}
          name={title}
          category={category_name}
          price={price}
          sku={sku}
          slug={params?.slug}
          discounted_price={discounted_price}
          description={description}
        />

        {/* <Ratings productId={id} /> */}

        {/* <SimilarProducts slug={params?.slug} /> */}
        <HomeProducts
          category={category_name}
          name="Similar by Category"
          className="title-typography"
        />
      </div>
    </>
  );
}
