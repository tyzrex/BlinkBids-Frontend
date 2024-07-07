import { BadgeDollarSign, CheckCheck, TruckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Phone from "public/placeholder.jpg";

import { IProductCardsProps } from "../../types/home";
import { cn } from "@/lib/utils";

export default function ProductCards(props: IProductCardsProps) {
  return (
    <div
      className={cn(
        "relative flex h-full max-h-[430px] w-[220px] flex-col overflow-hidden rounded-md border border-gray-300 bg-white all-transition hover:border-blue-500 hover:shadow-lg  hover:translate-y-2 group",
        props.className ?? ""
      )}
    >
      <Link
        prefetch={props.prefetch !== undefined ? props.prefetch : false}
        className="relative flex-center h-52 py-10  rounded-t-md"
        href={`/product-detail/${props.slug}`}
      >
        <div className="flex items-center justify-center">
          <Image
            src={
              props.images
                ? // ? `${process.env.IMAGE_API_URL}images/${props.images}`
                  `/api/images/${props.images}`
                : Phone ?? Phone
            }
            width={260}
            height={260}
            alt="product image"
            // loading="lazy"
            loading="eager"
            priority
            className="object-contain h-[200px] md:h-[179px] w-full aspect-square"
          />
        </div>
      </Link>
      <div className="flex flex-col my-3 px-6 gap-1">
        <Link href={`/product-detail/${props.slug}`} prefetch={false}>
          <span className="card-title-name line-clamp-2 h-[48px] text-gray-700 font-semibold text-wrap">
            {props?.name}
          </span>
        </Link>
        {props?.discounted_price && props.discounted_price !== props.price ? (
          <div className="flex flex-col">
            <span className=" line-through text-[14px] text-[#595959]">
              Rs. {props?.price}
            </span>
            <span className="text-[20px] font-bold text-accent-2">
              Rs. {props?.discounted_price}
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className=" line-through opacity-0 text-[14px] text-[#595959]">
              Rs. {props?.price}
            </span>
            <span className="text-[20px] font-bold text-accent-2">
              Rs. {props?.price}
            </span>
          </div>
        )}
      </div>
      <div className="px-3 pb-5">
        <div className="flex items-center justify-between gap-2 mt-4">
          {props.emi_available && (
            <div className="flex items-center gap-2 border border-accent-1 rounded-full px-2 py-1">
              <CheckCheck className="w-4 h-4 text-accent-1" />
              <p className="text-xs text-gray-500">EMI</p>
            </div>
          )}

          <div className="flex items-center gap-2 border border-accent-2 rounded-full px-2 py-1">
            <TruckIcon className="w-4 h-4 text-accent-2" />
            <p className="text-xs text-gray-500">Delivery</p>
          </div>
        </div>
        {/* <CartButton productId={props.id} /> */}
      </div>
    </div>
  );
}
