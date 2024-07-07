import { getServerSession } from "next-auth";

import { getParentCategoryList } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { CategoryForm } from "../_components/categories-form";
import { goTry } from "go-go-try";
import ErrorComponent from "@/components/Error";

export default async function Page() {
  const session = await getServerSession(options);
  const [error, response] = await goTry(getParentCategoryList(session));
  if (error || !response) {
    return (
      <ErrorComponent
        error={"404"}
        message="Please add parent categories first"
      />
    );
  }

  return (
    <>
      <CategoryForm
        type="child"
        formType="create"
        category_type_response={response}
      />
    </>
  );
}
