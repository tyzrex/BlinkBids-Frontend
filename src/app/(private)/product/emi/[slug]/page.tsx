import { Suspense } from "react";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import SimilarProducts from "@/app/(public)/product-detail/[slug]/components/SimilarProducts";
import { serverRequest } from "@/services/serverRequest";

import FormStepper from "../_components/emi-form-stepper";
import Product from "../_components/emi-product-detail";
import { goTry } from "go-go-try";
import { getProductDetail } from "@/api/getProductDetail";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const [error, productDetails] = await goTry(
    getProductDetail(props.params.slug)
  );

  if (error || !productDetails) {
    notFound();
  }

  const product = productDetails.product;

  const defaultTitle = `Apply EMI for ${product.name} -  fatafatsewa.com`;
  const defaultDescription = `
  ${
    product.short_description ? product.short_description : product.name
  } - fatafatsewa.com`;
  const defaultKeywords = `${product.name} - fatafatsewa.com`;

  const title = product?.meta_title
    ? `Apply EMI for ${product.meta_title} fatafatsewa.com`
    : defaultTitle;
  const description = product?.meta_description
    ? `${product.meta_description} fatafatsewa.com`
    : defaultDescription;
  const keywords = product?.meta_keywords
    ? `${product.meta_keywords} fatafatsewa.com`
    : defaultKeywords;

  const canonicalUrl = `/product/${props.params.slug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Page(props: Props) {
  const productSlug = props.params.slug;
  return (
    <>
      <section className="flex flex-col gap-5 xl:flex-row bg-white py-4 px-2 shadow-lg my-10">
        <section className="xl:w-[25%] px-3 md:px-6">
          <Suspense fallback={null}>
            <Product slug={productSlug} />
          </Suspense>
        </section>
        <section className="xl:w-[75%] px-3 md:px-6">
          <FormStepper />
        </section>
      </section>
      <SimilarProducts slug={productSlug} />
    </>
  );
}
