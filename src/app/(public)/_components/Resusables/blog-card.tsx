import Image from "next/image";
import Link from "next/link";
import BlogImage from "public/assets/mobile-phones-apple-iphone-200x200.jpg";

interface BlogCards {
  id: number;
  title: string;
  short_description: string;
  image: string;
  slug: string;
}

export default function BlogCards({
  id,
  title,
  short_description,
  image,
  slug,
}: BlogCards) {
  return (
    <Link href={`/blog/${slug}`} key={id}>
      <div className="relative flex w-full max-w-[380px] h-full flex-col overflow-hidden rounded-lg border border-gray-300 bg-white hover:shadow-lg transition-all ease-in-out duration-500">
        <div className="relative flex h-50 md:h-60 overflow-hidden rounded-t-xl flex-center">
          <Image
            className="object-cover aspect-[2:1] w-full h-full"
            src={image ? `/api/images/${image}` : "/placeholder.jpg"}
            alt="product image"
            width={200}
            height={100}
            loading="lazy"
          />
          {/* fix the blog image from bcakend */}
        </div>
        <div className="mt-2 px-3 pb-3">
          <h5 className="text-[13px] md:text-[15px] font-semibold text-slate-900 truncate">
            {title}
          </h5>

          <div className="flex items-center">
            <div
              className="text-sm text-gray-500 my-3 line-clamp-3
            "
            >
              {short_description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
