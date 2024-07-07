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
import { Button } from "@/components/ui/button";

export default function HeroSwiper({
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
  // const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Link href={"https://fatafatsewa.com"}>
              <div className="w-full p-5 md:py-20 md:px-10  object-cover bg-accent-1 mt-5">
                <div className="grid lg:grid-cols-2 content-center w-full h-full gap-10">
                  <div className="flex flex-col  items-start">
                    <h1 className="text-3xl lg:text-6xl font-bold text-white">
                      Blinked Bids
                    </h1>

                    <div className="flex flex-col items-start mt-2">
                      <h2 className="text-xl md:text-2xl font-semibold text-white">
                        Discover Amazing Deals
                      </h2>
                      <p className="text-white">
                        Browse through our wide selection of products and find
                        the best deals available. From electronics to fashion,
                        we have it all! Shop now and save big!
                      </p>
                    </div>

                    <Button className="bg-accent-3 text-black font-bold mt-5">
                      Shop Now
                    </Button>
                  </div>

                  <div className="flex justify-center items-start gap-5 flex-col">
                    <div className="flex items-center">
                      <p
                        className="text-3xl lg:text-7xl font-bold text-black bg-accent-3 p-2"
                        style={{ transform: "rotate(-20deg)" }}
                      >
                        SALE
                      </p>

                      <p className="ml-5 text-3xl lg:text-7xl font-bold text-white">
                        Upto 30%
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-xl lg:text-5xl font-bold text-white bg-accent-2 p-2 mt-5">
                        5 Days Left
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
}
