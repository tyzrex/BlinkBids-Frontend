import Image from "next/image";

import { getBanksList, getProductDetail } from "@/api/getProductDetail";
import SocialShare from "@/app/(public)/product-detail/[slug]/components/SocialShare";

import SetProductPrice from "./set-product-price";

export default async function Product({ slug }: { slug: string }) {
  const [product, banks] = await Promise.all([
    getProductDetail(slug),
    getBanksList(),
  ]);

  // console.log(product);

  if (!product) {
    return <div>No Product Found</div>;
  }

  const productDetail = product.product;
  // console.log(banks);

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 ">
          <div>
            <h2 className="text-2xl font-bold text-title-text text-center md:text-left">
              {productDetail?.name.slice(0, 20)}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-6 xl:flex-col justify-between items-center md:items-start">
            <div className="md:w-1/2 xl:w-full">
              <Image
                src={
                  productDetail?.images[0]
                    ? `/api/images/${productDetail?.images[0]}`
                    : "/images/placeholder.png"
                }
                width={300}
                height={300}
                alt={productDetail?.name}
              />
            </div>
            <div className="flex items-start  flex-col gap-3 w-full">
              <h6 className="text-2xl font-bold text-accent-2">
                Price: Rs. {productDetail?.price}
              </h6>
              <div className="flex gap-2 items-center justify-between w-full">
                <h6 className="text-xl font-bold text-[15px] text-[#101010]">
                  Brand:
                </h6>
                <p
                  className="text-gray-600
            border border-gray-300 px-2 py-1 rounded-md
          "
                >
                  {productDetail?.brand}
                </p>
              </div>

              <div className="flex gap-2 items-center justify-between w-full">
                <h6 className="text-xl font-bold text-[15px] text-[#101010]">
                  Category:
                </h6>
                <p
                  className="text-gray-600
            border border-gray-300 px-2 py-1 rounded-md
          "
                >
                  {productDetail?.category}
                </p>
              </div>
              <SocialShare />
              <SetProductPrice
                productPrice={productDetail?.price}
                productId={productDetail?.id}
                bankList={banks?.results}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
