"use client";

import Link from "next/link";
import CategoryCards from "../Resusables/category-card";

export default function MobileCategorySwiper({ data }: any) {
  return (
    <>
      <div className="overflow-hidden">
        <div className="flex items-center gap-2 w-full overflow-auto pb-4 mobile-category-swiper mt-4 relative ">
          {data?.results?.map((item: any, index: number) => {
            return (
              <Link
                prefetch={false}
                href={`/category/${item.slug}`}
                key={index}
              >
                <CategoryCards
                  key={index}
                  index={index}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* <div>
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          onSwiper={setSwiper}
          spaceBetween={50}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            350: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            540: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },

            1280: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
          }}
        >
          {data && swiper ? (
            data?.map(
              (item: any, index: number) => {
                // Assuming data.length is an even number
                return (
                  <SwiperSlide key={index} className="mb-10">
                    <div className="grid gap-4">
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
                  </SwiperSlide>
                );
              }

            )
          ) : (
            <div className="flex items-center justify-center xl:justify-between">
              <div className="xl:hidden h-60 flex-center w-full">
                <span className="loader"></span>
              </div>

              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div className="hidden xl:block h-full w-full " key={index}>
                    <Loaders />
                  </div>
                ))}
            </div>
          )}

        </Swiper>
      </div> */}
    </>
  );
}
