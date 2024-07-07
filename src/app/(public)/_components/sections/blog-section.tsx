import { goTry } from "go-go-try";

import { getHomeBlogs } from "@/api/homeApi";

import { BlogData } from "../../types/blog";
import BlogSwiper from "../Swipers/blog-section-swiper";
import NewCard from "../../blog/[slug]/new_card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BlogCards from "../Resusables/blog-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default async function BlogSection() {
  const [error, blogs] = await goTry(getHomeBlogs());

  if (error || !blogs) {
    return <>No Blogs Found</>;
  }

  const swiperData: BlogData[] = blogs.results;

  return (
    <>
      <section>
        <div className="mb-5">
          <h2 className="middle-text-title-typography">Our Articles</h2>
        </div>
        <Carousel>
          <CarouselContent className="py-2">
            {swiperData.map((blog) => (
              <CarouselItem
                key={blog.id}
                className="s:basis-1/2 md:flex-[0_0_auto] xl:basis-1/4 2xl:basis-1/4"
              >
                <BlogCards
                  id={blog.id}
                  title={blog.title}
                  short_description={blog.short_desc}
                  image={blog.thumbnail}
                  slug={blog.slug}
                  key={blog.id}
                  // category={blog.category}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* <BlogSwiper data={swiperData} /> */}
        <div className="flex w-full items-center lg:justify-center mt-10">
          <Link href="/blogs" prefetch={false}>
            <Button
              variant={"ghost"}
              className="underline text-accent-2 hover:text-accent-1"
            >
              View All Articles
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
