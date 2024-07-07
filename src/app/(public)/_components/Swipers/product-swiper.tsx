"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProdCard from "../Resusables/new-product-card";

interface IProductSwiperProps<T> {
  data: T[];
  name?: string;
}

export default function ProductsSwiper({
  data,
  name,
}: IProductSwiperProps<any>) {
  console.log(data);
  return (
    <>
      <Carousel className="w-full">
        <CarouselContent>
          {data?.map((item, index: number) => {
            return (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:flex-[0_0_auto] xl:basis-1/5 2xl:basis-1/6"
              >
                <ProdCard
                  prefetch={false}
                  emi_available={item.emi_available}
                  discount_percent={item.discount_percent}
                  discounted_price={item.discounted_price}
                  cat_name={name}
                  key={index}
                  index={index}
                  id={item.id}
                  name={item.title}
                  price={item.price}
                  images={
                    //check if the image is null or not
                    item.images.length > 0
                      ? item.images[0].image_url
                      : "/404.png"
                  }
                  slug={item.slug}
                  className="sm:max-w-[234px] xl:max-w-none"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="hidden lg:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </>
  );
}
