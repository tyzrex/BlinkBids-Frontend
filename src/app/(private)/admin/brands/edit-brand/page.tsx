import { getBrandDetailById } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";
import { getServerSession } from "next-auth";
import CmsBrandForm from "../add-brand/_components/cms-brand-form";
import { BrandDetail } from "../../utils/brandTypes";

interface IBrandDetailPage {
  searchParams: { [key: string]: string };
}

export default async function Page({ searchParams }: IBrandDetailPage) {
  const session = await getServerSession(options);
  const brandId = searchParams.id;

  const brandDetail = await getBrandDetailById(session, brandId);
  const brandDetailData: BrandDetail = brandDetail;

  if (brandDetail.error) {
    return (
      <ErrorComponent error={brandDetail.error} message={brandDetail.message} />
    );
  }

  return (
    <>
      <CmsBrandForm brandDetailData={brandDetailData} />
    </>
  );
}
