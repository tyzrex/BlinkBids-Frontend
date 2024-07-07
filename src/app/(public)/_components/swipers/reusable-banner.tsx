"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import Image from "next/image";
import Link from "next/link";
// import FallbackBanner from "public/assets/fallbackbanner.webp";
import Head from "next/head";

export default function ReusableBanner({
  data,
}: {
  data: {
    id: number;
    title: string;
    image: any;
    link: string;
  }[];
}) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <>
      <Carousel plugins={[plugin.current]}>
        <CarouselContent>
          {data?.map((banner: any) => (
            <CarouselItem key={banner.id}>
              <Link href={banner.link}>
                <Image
                  src={
                    banner.image instanceof Object
                      ? banner.image
                      : `${banner.image}`
                  }
                  alt={banner.title}
                  className="w-full aspect-[1920/450] md:aspect-[1920/450] object-cover"
                  height="450"
                  width="1920"
                  priority
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="100vw"
                  // make it load fast
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
