"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Image from "next/image";
import Link from "next/link";
import Logo from "public/assets/cart_8.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const pagination = {
  clickable: true,
  renderBullet: function (_index: number, className: string) {
    return (
      '<span class="' +
      className +
      ' !transition-all !duration-500 !bg-accent-4 "></span>'
    );
  },
};

export default function BrandCarousel() {
  const desktop = [
    {
      id: 1,
      title: "Banner 1",
      image: Logo,
      link: "/",
    },
    {
      id: 2,
      title: "Banner 2",
      image: Logo,
      link: "/",
    },
    {
      id: 3,
      title: "Banner 3",
      image: Logo,
      link: "/",
    },
  ];

  const mobile = [
    {
      id: 1,
      title: "Banner 1",
      image: Logo,
      link: "/",
    },
    {
      id: 2,
      title: "Banner 2",
      image: Logo,
      link: "/",
    },
    {
      id: 3,
      title: "Banner 3",
      image: Logo,
      link: "/",
    },
  ];
  return (
    <>
      <div className="hidden lg:block h-full ">
        <Swiper
          pagination={pagination}
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          slidesPerGroup={1}
          autoplay={true}
          className="!p-0 "
        >
          {desktop.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Image
                  src={banner.image}
                  alt={banner.title}
                  width={0}
                  height={0}
                  className="h-[150px] w-full sm:h-[250px] object-cover"
                  priority
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="block lg:hidden ">
        <Swiper
          pagination={pagination}
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          slidesPerGroup={1}
          autoplay={true}
          className="!p-0 "
        >
          {mobile.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Image
                  src={banner.image}
                  alt={banner.title}
                  width={0}
                  height={0}
                  className="h-[300px] w-full sm:h-full object-cover"
                  priority
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
