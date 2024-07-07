import { getHomeBanners } from "@/api/homeApi";
import { CarouselItem } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
export interface HomeImageLinkPair {
  id: number;
  title: string;
  image: string;
  link: string;
}
export default function HeroBannerSlide() {
  const imageLinkPairsDto: HomeImageLinkPair[] = [];

  const {
    data: banner,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["home-banner"],
    queryFn: () =>
      getHomeBanners("hero").then((data) => {
        console.log(data);
        return data?.results.map((result) => {
          const { images, link } = result;

          if (!images || !link) return;

          for (let i = 0; i < images.length; i++) {
            return {
              id: i + 1,
              image: images[i],
              link: link[i] || "", // Fallback to an empty string if the link is not provided
              title: images[i],
            };
          }
        });
      }),
  });

  return (
    <>
      {banner?.map((banner: any) => (
        <CarouselItem key={banner.id}>
          <Link href={banner.link}>
            <Image
              src={
                banner.image instanceof Object
                  ? banner.image
                  : `/api/banners/${banner.image}`
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
    </>
  );
}
