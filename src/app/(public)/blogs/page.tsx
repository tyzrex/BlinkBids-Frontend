import { goTry } from "go-go-try";
import { Metadata } from "next";

import { getHomeBlogs } from "@/api/homeApi";
import ErrorComponent from "@/components/Error";

import BlogCards from "../_components/Resusables/blog-card";
import Pagination from "../search/components/pagination";
import { BlogData } from "../types/blog";

export const metadata: Metadata = {
  title: "FatafatSewa | Latest Blogs - fatafatsewa.com",
  description: "Blogs - fatafatsewa.com",
  keywords: "Blogs - fatafatsewa.com",
  alternates: {
    canonical: "/blogs",
  },
};

interface IBlogsPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page(props: IBlogsPage) {
  const currentPage = props?.searchParams?.page;
  const [error, blogs] = await goTry(
    getHomeBlogs(currentPage ? parseInt(currentPage as string) : 1)
  );
  if (error || !blogs) {
    return <ErrorComponent error={"404"} message={"failed fetching blogs"} />;
  }
  const BlogPageData: BlogData[] = blogs.results;
  //console.log(blogs);
  return (
    <>
      <article className="max-w-layout py-10">
        <h1 className="page-title-typography mb-10">Recent Blogs</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {BlogPageData?.map((blog) => {
            return (
              <BlogCards
                image={blog.thumbnail}
                id={blog.id}
                key={blog.id}
                title={blog.title}
                short_description={blog.short_desc}
                slug={blog.slug}
              />
            );
          })}
        </section>

        <Pagination
          currentPage={parseInt(currentPage as string)}
          total_pages={blogs.total_pages}
          next={blogs.next}
          previous={blogs.previous}
          path="/blogs"
        />
      </article>
    </>
  );
}
