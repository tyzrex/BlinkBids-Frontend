"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const data = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 27 34"
        fill="none"
        className="w-6 h-6 md:w-8 md:h-8"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.5999 33.6666C6.41162 31.4596 1.15039 24.7311 0.266602 18.6666V6.99998L13.5999 0.333313L26.9333 6.99998V18.6666C26.0495 24.7311 20.7882 31.4596 13.5999 33.6666ZM18.5999 27.0883V27H18.6951L18.5999 27.0883ZM5.92096 18.3809C5.26955 17.7295 5.27013 16.6747 5.92096 16.0239C6.57178 15.373 7.62658 15.3724 8.27798 16.0239L11.8135 19.5594L18.8846 12.4883C19.5354 11.8375 20.5902 11.8369 21.2416 12.4883C21.893 13.1397 21.8924 14.1945 21.2416 14.8453L12.992 23.0949C12.3412 23.7457 11.2864 23.7463 10.635 23.0949L5.92096 18.3809Z"
          fill="#17B5BF"
        />
      </svg>
    ),
    title: "Genuine Products",
    subtitle: "24 months",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 38 38"
        fill="none"
        className="w-6 h-6 md:w-8 md:h-8"
      >
        <path
          d="M1.12182 20.1785C-0.179929 21.4802 -0.179929 23.5908 1.12182 24.8925L3.47884 27.2496L27.0491 3.67934L24.692 1.32232C23.3903 0.0205707 21.2797 0.0205725 19.978 1.32232L1.12182 20.1785Z"
          fill="#FFAA04"
        />
        <path
          d="M30.5846 7.21487L7.01437 30.7851L12.9069 36.6777C14.2087 37.9794 16.3192 37.9794 17.621 36.6777L36.4772 17.8215C37.7789 16.5197 37.7789 14.4092 36.4772 13.1074L30.5846 7.21487Z"
          fill="#FFAA04"
        />
      </svg>
    ),
    title: "EMI Available",
    subtitle: "3-12 months",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28 34"
        fill="none"
        className="w-6 h-6 md:w-8 md:h-8"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.666992 18.6666C1.55078 24.7311 6.81201 31.4596 14.0003 33.6666C21.1886 31.4596 26.4499 24.7311 27.3337 18.6666V6.99998L14.0003 0.333313L0.666992 6.99998V18.6666ZM4.00033 17H14.0003V30.1559C19.7197 28.1084 23.3005 22.4915 24.0003 18.4062V17H14.0003V4.06053L4.00033 9.06053V17Z"
          fill="#0062CC"
        />
      </svg>
    ),
    title: "Payments",
    subtitle: "Secured",
  },
  {
    id: 4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 34 28"
        fill="none"
        className="w-6 h-6 md:w-8 md:h-8"
      >
        <path
          d="M0.532227 2.33335C0.532227 1.41288 1.27842 0.666687 2.19889 0.666687H18.8656C19.786 0.666687 20.5322 1.41288 20.5322 2.33335V24H15.5322C14.6118 24 13.8928 23.2333 13.5916 22.3635C12.9138 20.4058 11.0539 19 8.86556 19C6.67726 19 4.81731 20.4058 4.13951 22.3635C3.83837 23.2333 3.11937 24 2.19889 24C1.27842 24 0.532227 23.2538 0.532227 22.3334V2.33335Z"
          fill="#0DA678"
        />
        <path
          d="M12.1989 24C12.1989 22.159 10.7065 20.6667 8.86556 20.6667C7.02464 20.6667 5.53223 22.159 5.53223 24C5.53223 25.841 7.02464 27.3334 8.86556 27.3334C10.7065 27.3334 12.1989 25.841 12.1989 24Z"
          fill="#0DA678"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.5322 2.33335L32.9442 8.53936C33.5089 8.82168 33.8656 9.39879 33.8656 10.0301V23.1667C33.8656 23.6269 33.4925 24 33.0322 24C32.572 24 32.2062 23.6241 32.1303 23.1702C31.7351 20.8037 29.6776 19 27.1989 19C25.0106 19 23.1506 20.4058 22.4728 22.3635C22.1717 23.2333 21.4527 24 20.5322 24V2.33335ZM22.1989 8.36341C22.1989 7.12444 23.5027 6.31861 24.6109 6.8727L31.2776 10.206C31.8422 10.4884 32.1989 11.0655 32.1989 11.6967V12.3334C32.1989 13.2538 31.4527 14 30.5322 14H23.8656C22.9451 14 22.1989 13.2538 22.1989 12.3334V8.36341Z"
          fill="#0DA678"
        />
        <path
          d="M30.5322 24C30.5322 22.159 29.0398 20.6667 27.1989 20.6667C25.358 20.6667 23.8656 22.159 23.8656 24C23.8656 25.841 25.358 27.3334 27.1989 27.3334C29.0398 27.3334 30.5322 25.841 30.5322 24Z"
          fill="#0DA678"
        />
      </svg>
    ),
    title: "Quick Delivery",
    subtitle: "One day delivery",
  },
  {
    id: 5,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="34"
        viewBox="0 0 33 34"
        fill="none"
        className="w-6 h-6 md:w-8 md:h-8"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.6608 0.979896C16.9579 1.13397 17.2345 1.3361 17.4762 1.57778L31.8209 15.9225C33.1237 17.2253 33.1227 19.3347 31.8209 20.6365L20.0358 32.4216C18.734 33.7234 16.6246 33.7244 15.3218 32.4216L0.977075 18.0769C0.353293 17.4532 0.000832745 16.6041 0.000976607 15.7201V3.93495C0.000688884 2.09381 1.49311 0.601397 3.33424 0.601685H15.1194C15.6617 0.602548 16.189 0.733605 16.6608 0.979896ZM10.6077 11.2084C11.9095 9.90663 11.9105 7.79719 10.6077 6.49438C9.30491 5.19158 7.19548 5.19258 5.89368 6.49438C4.59188 7.79618 4.59087 9.90562 5.89368 11.2084C7.19648 12.5112 9.30592 12.5102 10.6077 11.2084Z"
          fill="#E4003F"
        />
      </svg>
    ),
    title: "Brands",
    subtitle: "Top Brands",
  },
];

export default function FatafatFeatures() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="my-5 sm:my-10">
      <h4 className="title-typography">Our Features</h4>
      <Carousel className="lg:hidden my-5 md:my-10" plugins={[plugin.current]}>
        <CarouselContent className="gap-2 px-4 sm:px-0">
          {data?.map((item: any, index: number) => {
            return (
              <CarouselItem
                key={index}
                className="h-auto flex-[0_0_auto] px-0 border py-4 "
              >
                <div className="w-[120px] md:w-[200px] flex flex-col items-center gap-5 ">
                  <div>{item.icon}</div>
                  <div>
                    <strong className="text-[12px] font-bold">
                      {item.title}
                    </strong>
                    <p className="text-[10px] font-normal">{item.subtitle}</p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </Carousel>

      <section className="hidden lg:block bg-white rounded-md w-full my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {data.map((item) => {
            return (
              <div
                className="flex flex-col lg:flex-row items-center justify-center mx-auto gap-5 py-[20px] border border-gray-300 w-full h-[120px]"
                key={item.id}
              >
                <div>{item.icon}</div>
                <div>
                  <strong className="text-[12px] md:text-[16px] font-bold">
                    {item.title}
                  </strong>
                  <p className="text-[10px] md:text-[14px] font-normal text-center lg:text-left">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
