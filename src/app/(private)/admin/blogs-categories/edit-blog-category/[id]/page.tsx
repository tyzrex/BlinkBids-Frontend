import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { getBlogCategoryDetailById } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import AddBlogCategoryForm from "../../add-blog-category/_components/add-blog-category-form";

interface BlogCategoryEdit {
  params: {
    id: string;
  };
}
export default async function Page(props: BlogCategoryEdit) {
  const session = await getServerSession(options);
  const blogCategoryId = parseInt(props.params.id);
  console.log(blogCategoryId);

  const [error, blogCategoryDetail] = await goTry(
    getBlogCategoryDetailById(session, blogCategoryId)
  );
  //console.log(blogCategories);
  if (error || !blogCategoryDetail)
    return (
      <ErrorComponent
        error={"404"}
        message={"Failed Fetching Blog Category Detail"}
      />
    );

  return (
    <>
      <AddBlogCategoryForm
        id={blogCategoryId}
        formType="edit"
        blogCategoryDetail={blogCategoryDetail}
      />
    </>
  );
}
