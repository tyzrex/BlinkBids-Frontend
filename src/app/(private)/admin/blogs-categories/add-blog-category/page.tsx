import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";

import AddBlogCategoryForm from "./_components/add-blog-category-form";

export default async function Page() {
  const session = await getServerSession(options);

  // const [error, blogCategories] = await goTry(getBlogCategoriesList(session));
  // //console.log(blogCategories);
  // if (error || !blogCategories)
  //   return (
  //     <ErrorComponent
  //       error={"404"}
  //       message={"Failed Fetching Blog Categories"}
  //     />
  //   );

  return (
    <>
      <AddBlogCategoryForm formType="create" />
    </>
  );
}
