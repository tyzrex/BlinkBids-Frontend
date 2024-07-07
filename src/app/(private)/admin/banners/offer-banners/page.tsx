import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { getHeroBanners } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";

import OfferBanner from "./_components/offer-banner-files";

interface ImageLinkPair {
  image: string;
  link: string;
  type: string;
}

export default async function Page() {
  const session = await getServerSession(options);
  const [[error, offerbanner], [error2, offerbanner2]] = await Promise.all([
    await goTry(getHeroBanners(session, "banner1")),
    await goTry(getHeroBanners(session, "banner2")),
  ]);

  const imageLinkPairsDto: ImageLinkPair[] | undefined =
    offerbanner?.results.flatMap((result) =>
      result.images.map((image, index) =>
        createImageLinkPair(result, image, index, "banner1")
      )
    );

  const imageLinkPairsDto2: ImageLinkPair[] | undefined =
    offerbanner?.results.flatMap((result) =>
      result.images.map((image, index) =>
        createImageLinkPair(result, image, index, "banner1")
      )
    );

  return (
    <>
      {/* <OfferBannerFirst banner="banner1" results={"s"}/> */}
      <OfferBanner
        banner="banner1"
        results={imageLinkPairsDto && imageLinkPairsDto[0]}
      />
      <OfferBanner
        banner="banner2"
        results={imageLinkPairsDto2 && imageLinkPairsDto2[0]}
      />
    </>
  );

  function createImageLinkPair(
    result: any,
    image: string,
    index: number,
    type: string
  ): ImageLinkPair {
    return {
      image: image,
      link: result.link[index] ?? "", // Using nullish coalescing for fallback
      type: type,
    };
  }
}
