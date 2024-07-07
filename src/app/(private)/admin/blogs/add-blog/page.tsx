import { getServerSession } from "next-auth";

import { getBlogCategoriesList } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";

import AddBlogForm from "./_components/add-blog-form";

export interface IBlogCategoryList {
  id: any;
  title: string;
}
export default async function Page() {
  const session = await getServerSession(options);

  const blogCategories = await getBlogCategoriesList(session);

  return (
    <>
      <AddBlogForm
        blogCategories={blogCategories as IBlogCategoryList[]}
        formType="create"
      />
    </>
  );
}
