import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { getBlogCategoriesList, getBlogDetailById } from "@/api/cms";
import { IblogDetail } from "@/app/(public)/types/blog";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import AddBlogForm from "../add-blog/_components/add-blog-form";

interface IEditBlogPage {
  searchParams: { [key: string]: string };
}

export default async function Page({ searchParams }: IEditBlogPage) {
  const session = await getServerSession(options);
  const blogId = searchParams.slug;

  const [blogCategories, [error, blogDetail]] = await Promise.all([
    getBlogCategoriesList(session),
    goTry(getBlogDetailById(session, blogId)),
  ]);
  const blogDetailData = blogDetail;
  //console.log(blogCategories);

  if (error || !blogDetail) {
    return (
      <ErrorComponent
        error={"404"}
        message={"Failed Fetching Blog Categories"}
      />
    );
  }

  return (
    <>
      <AddBlogForm
        formType="edit"
        blogDetail={blogDetailData}
        blogCategories={blogCategories}
      />
    </>
  );
}
