"use client";
import Link from "next/link";
import CategoryCards from "../Resusables/category-card";

export default function CategoriesSwiper({ data }: any) {
  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        {data?.map((item: any, index: number) => {
          return (
            <div key={index} className="flex-[0_0_auto] xl:basis-1/7">
              <Link prefetch={false} href={`/category/${item.slug}`}>
                <CategoryCards
                  key={index}
                  index={index}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
