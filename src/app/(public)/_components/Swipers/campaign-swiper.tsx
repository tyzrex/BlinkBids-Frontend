"use client";

import CampaignSlide from "../sections/individual-campaign";
import { Offer } from "@/api/campaign";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function CampaignSwiper({ data }: { data: Offer[] }) {
  return (
    <>
      <Carousel>
        <CarouselContent>
          {data?.map((item, index: number) => {
            return (
              <CarouselItem key={index} className="px-0">
                <CampaignSlide
                  id={item.id}
                  name={item.name}
                  description={`Hurry up! ${item.name} is on sale now. Get it now at a discounted prices.
                  `}
                  end_date={item.end_date}
                  products={item.products}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
}
