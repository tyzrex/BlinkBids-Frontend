import { goTry } from "go-go-try";

import { getHomeBanners } from "@/api/homeApi";

import OfferBanners from "../sections/offer-banner";

export interface HomeImageLinkPair {
  id: number;
  title: string;
  image: string;
  link: string;
}

export default async function OfferBannerWrapper({
  offer_banner_one,
  offer_banner_two,
}: {
  offer_banner_one: "banner1";
  offer_banner_two: "banner2";
}) {
  const [[errors, banner1], [errors2, banner2]] = await Promise.all([
    goTry(getHomeBanners(offer_banner_one)),
    goTry(getHomeBanners(offer_banner_two)),
  ]);

  if (errors || errors2) {
    return <>Failed Fetching</>;
  }

  const imageLinkPairsDto: HomeImageLinkPair[] = [];

  banner1?.results.forEach((result) => {
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

  banner2?.results.forEach((result) => {
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
      <OfferBanners data={imageLinkPairsDto} />{" "}
    </>
  );
}
