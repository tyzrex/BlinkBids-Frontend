import { IProductCardsProps } from "../../types/home";
import Phone from "public/placeholder.jpg";
import { BadgePercent, Box, CheckCheck, StarIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "./image-with-fallback";

export default function ProdCard(props: any) {
  return (
    <Link href={`/product-detail/${props.slug}`} prefetch={false}>
      <div
        className={cn(
          props.className,
          "hover:shadow-md transition-all duration-300 flex flex-col text-black bg-white leading-[210%] border p-3 sm:p-4 h-full "
        )}
      >
        <div className="flex gap-1.5 justify-start pb-2 text-xs bg-white">
          <div className="flex gap-1.5 items-center text-white">
            <div className="text-white bg-accent-1 rounded-full p-1">
              <Box size={12} />
            </div>
            <span className="text-accent-1">Available</span>
          </div>
        </div>
        <div className="w-full flex-center">
          <div className="w-[200px] sm:min-w-[100px] ">
            <ImageWithFallback
              fallback={"/placeholder.jpg"}
              src={props.images}
              width={260}
              height={260}
              alt="product image"
              loading="eager"
              priority
              className="object-cover lg:object-contain w-full aspect-square"
            />
          </div>
        </div>
        <div className="text-md sm:text-lg font-semibold leading-6 text-sky-700">
          <span className="text-sm leading-5 line-through text-stone-500 ">
            {props?.discounted_price &&
              props.discounted_price !== props.price && (
                <>Rs. {props.price.toLocaleString("en-IN")}</>
              )}
          </span>
          <br />
          Rs.{" "}
          {props?.discounted_price && props.discounted_price !== props.price
            ? props.discounted_price.toLocaleString("en-IN")
            : props.price.toLocaleString("en-IN")}
        </div>
        <div className="mt-3 text-sm min-h-[40px]">
          <span className="line-clamp-2 text-wrap font-bold text-black">
            {props?.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
