import { getServerSession } from "next-auth";

import { returnError } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";
import { serverProtectedRequest } from "@/services/serverRequest";
import { ProductInfo } from "@/store/products/ProductInfo";

import FormStepper from "./_components/AddFormStepper";
import EditProductForm from "../_components/product-entry-form";
import { campaignDTO } from "@/dto/campaign-dto";

interface IProduct {
  searchParams?: { [key: string]: string | string[] | undefined };
}

async function getProductDetail(id: string) {
  const session = await getServerSession(options);
  if (id) {
    try {
      const response = await serverProtectedRequest(
        `products/id/?id=${id}`,
        "GET",
        session
      );
      return {
        productDetail: response?.data,
      };
    } catch (err) {
      return {
        error: returnError(err),
      };
    }
  } else {
    return {};
  }
}

async function getProductCategories() {
  const session = await getServerSession(options);
  const response = await serverProtectedRequest(
    `category/list`,
    "GET",
    session
  );
  return response?.data;
}

async function getProductBrands() {
  const session = await getServerSession(options);
  const response = await serverProtectedRequest(
    `products/brands/names`,
    "GET",
    session
  );
  return response?.data;
}

async function getProductCampaigns() {
  const session = await getServerSession(options);
  const response = await serverProtectedRequest(
    `campaigns/list`,
    "GET",
    session
  );
  return response?.data;
}

export default async function AddProduct(props: IProduct) {
  const productId = props?.searchParams?.id;
  const { productDetail, error } = await getProductDetail(productId as string);

  const [categories, brands, campaign] = await Promise.all([
    getProductCategories(),
    getProductBrands(),
    getProductCampaigns(),
  ]);

  if (!productDetail || error) {
    return <ErrorComponent error={error?.error} message={error?.message} />;
  }
  const product = productDetail[0] as ProductInfo;
  console.log(product);
  return (
    <>
      <section className="p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-700 mb-8">
          Edit Product
        </h1>
        {/* <FormStepper
          product_id={parseInt(productId as string)}
          productInfo={product}
          categories={categories}
          brands={brands}
          campaign={campaign}
        /> */}
        <EditProductForm
          formType="edit"
          productInfo={product}
          brands={brands}
          categories={categories}
          campaigns={campaignDTO.receive(campaign.results)}
        />
      </section>
    </>
  );
}
