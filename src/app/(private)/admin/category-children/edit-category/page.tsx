import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { getParentCategoryList } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";
import { requestHandler } from "@/services/serverRequest";

import { CategoryForm } from "../../category-children/_components/categories-form";

interface ICategoryProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const getCategoryDetail = async (name: string) => {
  const session = await getServerSession(options);
  const response = await requestHandler<any>(
    `category/info?name=${name}`,
    "GET",
    session
  );
  return response.data;
};

export default async function Page(props: ICategoryProps) {
  const categoryName = props?.searchParams?.name;
  const session = await getServerSession(options);
  const response = await getParentCategoryList(session);
  const [error, categoryDetail] = await goTry(
    getCategoryDetail(categoryName as string)
  );

  if (!categoryDetail || error) {
    return (
      <ErrorComponent error={"404"} message={"Failed Fetching Category"} />
    );
  }

  return (
    <>
      <CategoryForm
        formType="edit"
        category_type_response={response}
        category={categoryDetail}
        type="child"
      />
    </>
  );
}
