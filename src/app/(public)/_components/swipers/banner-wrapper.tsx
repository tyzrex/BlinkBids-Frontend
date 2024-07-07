import { goTry } from "go-go-try";
// import FallbackBanner from "public/assets/fallbackbanner.webp";

import { getHomeBanners } from "@/api/homeApi";

import BannerSwiper from "./hero-banner-swiper";
import FallbackBanner from "public/assets/fallbackbanner.webp";

export interface HomeImageLinkPair {
  id: number;
  title: string;
  image: string;
  link: string;
}

export default async function BannerWrapper({
  banner_type,
}: {
  banner_type: "hero" | "ad";
}) {
  const [errors, banners] = await goTry(getHomeBanners(banner_type));
  // console.log(banners);
  // if (errors || !banners || banners.results[0].images.length === 0) {
  //   return (
  //     <BannerSwiper
  //       data={[
  //         {
  //           id: 1,
  //           title: "Fallback Banner",
  //           image: FallbackBanner,
  //           link: "https://fatafatsewa.com",
  //         },
  //       ]}
  //     />
  //   );
  // }

  const imageLinkPairsDto: HomeImageLinkPair[] = [];

  banners?.results.forEach((result) => {
    const { images, link } = result;

    if (!images || !link) return;

    for (let i = 0; i < images.length; i++) {
      imageLinkPairsDto.push({
        id: i + 1,
        image: images[i],
        link: link[i] || "", // Fallback to an empty string if the link is not provided
        title: images[i],
      });
    }
  });

  return (
    <>
      <BannerSwiper data={imageLinkPairsDto} banner_type={banner_type} />
    </>
  );
}
