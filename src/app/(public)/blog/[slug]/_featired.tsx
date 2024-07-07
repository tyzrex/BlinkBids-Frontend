import { goTry } from "go-go-try";

import { getHomeBlogs } from "@/api/homeApi";

import { BlogData } from "../../types/blog";
import NewCard from "./new_card";

export default async function FeaturedBlogs() {
  const [error, blogs] = await goTry(getHomeBlogs());

  if (error || !blogs) {
    return <>No Blogs Found</>;
  }

  const swiperData: BlogData[] = blogs.results.splice(0, 10);

  console.log(swiperData);

  return (
    <>
      <section className="mt-10">
        <div className="mb-5">
          <h2 className="middle-text-title-typography">Featured</h2>
        </div>

        {swiperData.map((blog) => (
          <NewCard
            id={blog.id}
            title={blog.title}
            short_description={blog.short_desc}
            image={blog.thumbnail}
            slug={blog.slug}
            key={blog.id}
            category={blog.category}
          />
        ))}
      </section>
    </>
  );
}
