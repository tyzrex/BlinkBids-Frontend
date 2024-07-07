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
import HeroBannerSlide from "./hero-banner-slide";

export default function BannerSwiper({
  data,
  banner_type,
}: {
  data?: {
    id: number;
    title: string;
    image: any;
    link: string;
  }[];
  banner_type?: "hero" | "ad";
}) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <>
      <Head>
        <link
          rel="prefetch"
          fetchPriority="high"
          type="image/webp"
          as="image"
          href={"/assets/fallbackbanner.webp"}
        />
      </Head>
      <Carousel plugins={[plugin.current]}>
        <CarouselContent>
          {banner_type === "hero" && (
            <CarouselItem>
              <Link href={"https://fatafatsewa.com"}>
                <Image
                  src={"/assets/fallbackbanner.webp"}
                  alt={"Fatafat Banner"}
                  className="w-full aspect-[1920/450] md:aspect-[1920/450] object-cover"
                  height="450"
                  width="1920"
                  priority
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw,"
                  rel="prefetch"
                  // make it load fast
                />
              </Link>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </>
  );
}
