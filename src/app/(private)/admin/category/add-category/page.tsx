import { getServerSession } from "next-auth";

import { getParentCategoryList } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { CategoryForm } from "../../category-children/_components/categories-form";

export default async function Page() {
  const session = await getServerSession(options);
  const response = await getParentCategoryList(session);
  return (
    <>
      <CategoryForm
        formType="create"
        category_type_response={response.results}
        type="parent"
      />
    </>
  );
}
