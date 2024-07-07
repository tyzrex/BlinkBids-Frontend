import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { deleteBanners } from "@/api/actions";
import { getHeroBanners } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";

import HeroBannerComponent from "./hero-banner-files";

interface ImageLinkPair {
  client_created_at?: number;
  image: File | string;
  link: string;
  name?: string;
  deleteImageData: () => void;
}
// Simplified and refactored version for clarity and efficiency

export default async function BannerImagesFetcher({
  type,
}: {
  type: "ad" | "hero" | "banner1" | "banner2";
}) {
  const session = await getServerSession(options);
  const [errors, heroBanners] = await goTry(getHeroBanners(session, type));

  // console.log(errors)

  // if (errors) {
  //   return <ErrorComponent error={404} message="Banners Not Found" />;
  // }

  // if (!heroBanners) {
  //   return <ErrorComponent error={404} message="Banners Not Found" />;
  // }

  // Simplified data processing using map and extracting logic into a function
  const imageLinkPairsDto: ImageLinkPair[] | undefined =
    heroBanners?.results.flatMap((result) =>
      result.images.map((image, index) =>
        createImageLinkPair(result, image, index, type)
      )
    );

  return (
    <HeroBannerComponent existingBanners={imageLinkPairsDto} type={type} />
  );
}

// Extracted function for creating ImageLinkPair objects
function createImageLinkPair(
  result: any,
  image: File | string,
  index: number,
  type: string
): ImageLinkPair {
  return {
    client_created_at: new Date(result.created_at).getTime(),
    image: image,
    link: result.link[index] ?? "", // Using nullish coalescing for fallback
    deleteImageData: async () => {
      "use server";
      await deleteBanners(image as string, type);
    },
  };
}
