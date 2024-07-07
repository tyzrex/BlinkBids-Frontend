import { getServerSession, Session } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { serverProtectedRequest } from "@/services/serverRequest";

import FormStepper from "./_components/AddFormStepper";
import EditProductForm from "../_components/product-entry-form";
import { campaignDTO } from "@/dto/campaign-dto";

async function getProductCategories(session: Session | null) {
  const response = await serverProtectedRequest(
    `category/list`,
    "GET",
    session
  );
  return response?.data;
}

async function getProductBrands(session: Session | null) {
  const response = await serverProtectedRequest(
    `products/brands/names`,
    "GET",
    session
  );
  return response?.data;
}

async function getProductCampaigns(session: Session | null) {
  const response = await serverProtectedRequest(
    `campaigns/list`,
    "GET",
    session
  );
  return response?.data;
}

export default async function AddProduct() {
  const session = await getServerSession(options);
  const [categories, brands, campaigns] = await Promise.all([
    getProductCategories(session),
    getProductBrands(session),
    getProductCampaigns(session),
  ]);

  return (
    <>
      <section className="p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-700 mb-8">
          Add New Product
        </h1>
        <EditProductForm
          formType="add"
          categories={categories}
          brands={brands}
          campaigns={campaignDTO.receive(campaigns.results)}
        />
      </section>
    </>
  );
}
