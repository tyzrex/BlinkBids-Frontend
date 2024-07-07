import { notFound } from "next/navigation";

import { getBrandProductsBySlug } from "@/api/brand";
import ErrorComponent from "@/components/Error";

import ProductCards from "../../_components/Resusables/product-card";
import BrandCarousel from "../../_components/swipers/brand-page-swiper";
import Pagination from "../../search/components/pagination";
import { goTry } from "go-go-try";
import ProdCard from "../../_components/Resusables/new-product-card";
import ReusableBanner from "../../_components/swipers/reusable-banner";

type Props = {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(props: Props) {
  const query = props?.params?.slug;

  if (!query) {
    return notFound();
  }

  const [error, products] = await goTry(
    getBrandProductsBySlug({
      slug: props.params.slug,
      page: parseInt(props.searchParams.page as string),
    })
  );

  if (error || !products) {
    return notFound();
  }

  const defaultTitle = `${query} - fatafatsewa.com`;
  const defaultDescription = `${products?.brand_details.name}
  } - fatafatsewa.com`;
  const defaultKeywords = `${products?.brand_details.name} - fatafatsewa.com`;

  const title = products?.brand_details?.meta_title
    ? `${products?.brand_details.meta_title} fatafatsewa.com`
    : defaultTitle;
  const description = products?.brand_details?.meta_description
    ? `${products?.brand_details.meta_description} fatafatsewa.com`
    : defaultDescription;
  const keywords = products?.brand_details?.meta_keywords
    ? `${products?.brand_details.meta_keywords} fatafatsewa.com`
    : defaultKeywords;

  const canonicalUrl = `/product/${props.searchParams.name}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BrandPage(props: Props) {
  const [errors, brandProducts] = await goTry(
    getBrandProductsBySlug({
      slug: props.params.slug,
      page: parseInt(props.searchParams.page as string),
    })
  );

  if (errors || !brandProducts) {
    return <ErrorComponent error={"404"} message="Brand Not Found" />;
  }

  console.log(brandProducts);

  console.log(brandProducts);
  const bannerData = {
    id: 1,
    title: brandProducts?.brand_details.name,
    image:
      "/api/images/" + brandProducts?.brand_details.images?.split("/").pop(),
    link: `/brand/${props.params.slug}`,
  };

  return (
    <>
      <div className="max-w-layout mt-5">
        <h1 className="page-title-typography mb-5">
          Viewing Brand, {brandProducts?.brand_details.name}
        </h1>
        <p className="text-gray-600">{brandProducts?.count} products found</p>
        {/* <BrandCarousel /> */}
        <ReusableBanner data={[bannerData]} />

        <div
          className="grid grid-cols-2  sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-10
      "
        >
          {brandProducts?.results?.map((product: any) => {
            return (
              <ProdCard
                index={product.id}
                key={product.id}
                id={product?.id}
                name={product?.name}
                price={product?.price}
                discount_percent={product?.discount_percent}
                discounted_price={product?.discounted_price}
                emi_available={product?.emi_available}
                images={
                  product?.images === null ? "404.png" : product.images[0]
                }
                slug={product.slug}
              />
            );
          })}
        </div>
        <Pagination
          currentPage={parseInt(props.searchParams.page as string) || 1}
          query={props.params.slug}
          path={"/brand/" + props.params.slug}
          next={brandProducts?.next}
          previous={brandProducts?.previous}
          total_pages={brandProducts?.num_pages}
        />
      </div>

      {brandProducts.brand_details.description && (
        <article className="max-w-layout py-10 page-detail">
          <div
            dangerouslySetInnerHTML={{
              __html: brandProducts?.brand_details.description || "",
            }}
          ></div>
        </article>
      )}
    </>
  );
}
