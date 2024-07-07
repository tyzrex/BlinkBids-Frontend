import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
  id: number;
  title: string;
  short_description: string;
  image: string;
  slug: string;
  category: string;
}

export default function NewCard({
  id,
  title,
  short_description,
  image,
  slug,
  category,
}: JobCardProps) {
  return (
    <>
      <Link prefetch={false} href={`/blog/${slug}`} key={id}>
        <div className=" bg-white border shadow-sm mt-5 hover:shadow-lg transition-all duration-300 ">
          <div className="relative rounded-lg px-2 md:px-6 py-5 flex items-center md:space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <div className="hidden sm:block flex-shrink-0 mb-2 md:mb-0 lg:absolute rounded-lg md:p-2 md:bg-white shadow md:-left-9">
              <Image
                height={48}
                width={48}
                src={`/api/images/${image}`}
                alt={title}
                className="h-16 w-16 rounded-lg object-contain aspect-[2:1]"
              />
            </div>
            <div className=" flex flex-col md:flex-row w-full">
              <div className="flex-1 min-w-0 px-2 md:pl-6 mb-2 md:mb-0 w-full">
                <span className="absolute inset-0" aria-hidden="true"></span>
                <p className=" text-[14px] md:text-[18px] font-semibold font-outfit truncate">
                  {title}
                </p>
                <p className="text-sm  text-gray-700 line-clamp-1">
                  {short_description}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  <span className="text-gray-500 flex items-center gap-2">
                    Category: {category}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
