"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useState } from "react";

import { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { BlogData } from "../../types/blog";
import BlogCards from "../Resusables/blog-card";
import CardLoader from "../Resusables/card-loader";

const pagination = {
  renderBullet: function (_index: number, className: string) {
    return (
      '<span class="' +
      className +
      ' !transition-all !duration-500 !bg-accent-2 "></span>'
    );
  },
};

interface IBlogSwiper {
  data?: BlogData[];
}

export default function BlogSwiper(props: IBlogSwiper) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  return (
    <>
      <div>
        <Swiper
          modules={[Pagination, Navigation]}
          onSwiper={setSwiper}
          spaceBetween={50}
          slidesPerView={5}
          pagination={pagination}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            390: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            660: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            990: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className="relative h-auto "
        >
          {props.data ? (
            props.data.map((blog, index: number) => {
              return (
                <SwiperSlide key={index} className="mb-10">
                  <BlogCards
                    id={blog.id}
                    key={blog.id}
                    title={blog.title}
                    image={blog.thumbnail}
                    short_description={blog.short_desc}
                    slug={blog.slug}
                  />
                </SwiperSlide>
              );
            })
          ) : (
            <div className="flex items-center justify-center xl:justify-between">
              <div className="xl:hidden h-60 flex-center w-full">
                <span className="loader"></span>
              </div>

              {Array(5)
                .fill(0)
                .map((_, index: number) => (
                  <div
                    className="hidden  xl:block h-full w-full all-transition "
                    key={index}
                  >
                    <CardLoader />
                  </div>
                ))}
            </div>
          )}
        </Swiper>
      </div>
    </>
  );
}
