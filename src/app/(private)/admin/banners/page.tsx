import { getServerSession } from "next-auth";
import Link from "next/link";

import BannerWrapper from "@/app/(public)/_components/swipers/banner-wrapper";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function BannerPage() {
  const session = await getServerSession(options);

  //const heroBanners = await getHeroBanners(session);
  //const offerBanner = await getOfferBanners(session, "banner2");
  //const offerBannerTwo = await getOfferBanners(session, "banner3");

  return (
    <>
      <section className="p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-700 mb-8">Banners</h1>

        {/* make 3 sections for one hero banner another is the offer banner and 3rd is the ad banners show the option to go to that certain page */}
        <div className="flex flex-col space-y-4">
          <div>
            <div className="flex-between">
              <h1 className="title-typography">Hero Banners</h1>
              <Link href="/admin/banners/hero-banners">
                <button className="accent-button px-5">
                  Manage Hero Banners
                </button>
              </Link>
            </div>
            <p className="text-gray-500 mt-4">
              This banner will be shown on the home page of the website.
            </p>
            <div className="my-10">
              <BannerWrapper banner_type="hero" />
            </div>
          </div>
          <div>
            <div className="flex-between">
              <div>
                <h1 className="title-typography">Offer Banner</h1>
                <p className="text-gray-500 mt-4">
                  This banner will be shown on the home page of the website.
                </p>
              </div>
              <Link prefetch={false} href="/admin/banners/offer-banners">
                <button className="login-button px-5">
                  Manage Offer Banners
                </button>
              </Link>
            </div>

            {/* two images of 50% width of screen flex col in small and flex in large */}
            <div className="flex flex-col md:flex-row gap-5 my-10">
              <div className="flex-1">
                {/* <div className="w-full h-80  bg-gray-100 rounded-md">
                  {offerBanner && (
                    <Image
                      src={
                        `${process.env.IMAGE_API_URL}images/banner2/` +
                        offerBanner[0].images.split("/").pop()
                      }
                      width={600}
                      height={600}
                      className="w-full h-full object-contain"
                      alt="offer-banner-1"
                    />
                  )}
                </div> */}
              </div>
              <div className="flex-1">
                {/* <div className="w-full h-80 bg-gray-100 rounded-md">
                  {offerBannerTwo && (
                    <Image
                      src={
                        `${process.env.IMAGE_API_URL}images/banner3/` +
                        offerBannerTwo[0].images.split("/").pop()
                      }
                      width={600}
                      height={600}
                      className="w-full h-full object-contain"
                      alt="offer-banner-2"
                    />
                  )}
                </div> */}
              </div>
            </div>
            <div>
              <div className="flex-between">
                <h1 className="title-typography">Ad Banners</h1>
                <Link href="/admin/banners/ad-banners">
                  <button className="accent-button px-5">
                    Manage Ad Banners
                  </button>
                </Link>
              </div>
              <p className="text-gray-500 mt-4">
                This banner will be shown on the home page of the website.
              </p>
              <div className="my-10">
                <BannerWrapper banner_type="ad" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
