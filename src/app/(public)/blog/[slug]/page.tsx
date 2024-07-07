import { Metadata } from "next";
import Image from "next/image";

import { getBlogbyID } from "@/api/homeApi";

import SocialShare from "../../product-detail/[slug]/components/SocialShare";
import { goTry } from "go-go-try";
import ErrorComponent from "@/components/Error";
import FeaturedBlogs from "./_featired";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const [error, blogDetails] = await goTry(getBlogbyID(props.params.slug));
  if (!blogDetails || error) {
    return {
      title: "Blog Not Found",
      description: "Blog Not Found",
      keywords: "Blog Not Found",
    };
  }

  const defaultTitle = `${blogDetails.name} - fatafatsewa.com`;
  const defaultDescription = `
  ${
    blogDetails.short_description
      ? blogDetails.short_description
      : blogDetails.name
  } - fatafatsewa.com`;
  const defaultKeywords = `${blogDetails.name} - fatafatsewa.com`;

  const title = blogDetails?.meta_title
    ? `${blogDetails.meta_title} fatafatsewa.com`
    : defaultTitle;
  const description = blogDetails?.meta_description
    ? `${blogDetails.meta_description} fatafatsewa.com`
    : defaultDescription;
  const keywords = blogDetails?.meta_keywords
    ? `${blogDetails.meta_keywords} fatafatsewa.com`
    : defaultKeywords;

  const canonicalUrl = `/blog/${props.params.slug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function Page(props: Props) {
  const params = props.params;
  const [error, blogContent] = await goTry(getBlogbyID(params.slug));
  if (error || !blogContent) {
    return <ErrorComponent message="Blog Not Found" error={"Error 404"} />;
  }
  return (
    <div className="flex flex-col xl:flex-row gap-10 w-full max-w-layout items-start py-10">
      <article className="w-full bg-white sm:px-10 xl:w-[75%] sm:py-10 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert ">
        <header className="mb-4 lg:mb-6 not-format ">
          <Image
            src={
              blogContent?.thumbnail
                ? `/api/images/${blogContent.thumbnail}`
                : "/images/placeholder.jpg"
            }
            alt="author"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-contain"
          />
          <address className="flex items-center my-6 not-italic">
            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <div>
                <h6
                  rel="author"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  {blogContent?.author}
                </h6>

                <p className="text-base text-gray-500 dark:text-gray-400">
                  <time
                    dateTime={new Date(
                      blogContent?.created_at
                    ).toLocaleDateString("en-US")}
                    title={new Date(blogContent?.created_at).toLocaleDateString(
                      "en-US"
                    )}
                  >
                    {new Date(blogContent?.created_at).toLocaleDateString(
                      "en-US"
                    )}
                  </time>
                </p>
              </div>
            </div>
          </address>
        </header>
        <SocialShare />
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white mt-10">
          {blogContent?.title}
        </h1>

        <p className="mb-6 text-lg text-gray-500 dark:text-gray-400">
          {blogContent?.short_desc}
        </p>

        <div className="mb-6 text-lg text-gray-500 dark:text-gray-400">
          <div
            className="product-description overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: blogContent?.content,
            }}
          ></div>
        </div>
      </article>
      <div className="w-full xl:w-[25%] sm:p-5 bg-white h-auto">
        <FeaturedBlogs />
      </div>
    </div>
  );
}
