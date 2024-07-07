import { getCampaignBySlug } from "@/api/campaign";
import { goTry } from "go-go-try";
import { ProductGrid } from "../../search/components/product-grid";
import BrandCarousel from "../../_components/swipers/brand-page-swiper";
import ProductCards from "../../_components/Resusables/product-card";
import Pagination from "../../search/components/pagination";
import ReusableBanner from "../../_components/swipers/reusable-banner";
import CountdownTimer from "../../_components/sections/countdown-timer";

type props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: props) {
  const campaignSlug = params.id;
  const currentPage = searchParams.page
    ? parseInt(searchParams.page as string)
    : 1;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const [error, campaignDetail] = await goTry(getCampaignBySlug(campaignSlug));

  if (error || !campaignDetail) {
    return <div>Failed to load campaign</div>;
  }

  const campaignDetailData = campaignDetail?.results[0];
  const campaignImageData = {
    id: 1,
    title: campaignDetailData?.name,
    image: "/api/campaigns/" + campaignDetailData.image.split("/").pop(),
    link: `campaign/${campaignSlug}`,
  };

  return (
    <>
      <div className="max-w-layout">
        <ReusableBanner data={[campaignImageData]} />

        <section className="w-full py-10 bg-gradient-to-r from-blue-500 to-purple-500 px-10 my-5 sm:my-10">
          <div className="">
            <div className="grid gap-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-accent-1 text-white px-3 py-1 text-sm ">
                  Campaign
                </div>
                <h1 className="title-typography text-white">
                  {campaignDetailData.name}
                </h1>
                <p className="max-w-[700px] text-accent-white md:text-xl/relaxed">
                  Hurry up! {campaignDetailData.name} campaign is live now. Grab
                  your favorite products at the best price.
                </p>
              </div>
              <div className="flex flex-col items-end space-y-4">
                <div className="inline-block rounded-lg bg-accent-2 text-white px-3 py-1 text-sm ">
                  Available Dates
                </div>
                <p className="max-w-[700px] text-accent-white md:text-xl/relaxed ">
                  {
                    //show the date as Month Day, Year
                    new Date(campaignDetailData.start_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    ) +
                      " - " +
                      new Date(campaignDetailData.end_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                  }
                </p>
                <div className="hidden sm:block">
                  <CountdownTimer endDate={campaignDetailData.end_date} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <h2 className="page-title-typography">Available Products</h2>

        <div
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-10
      "
        >
          {campaignDetailData.products.length > 0
            ? campaignDetailData.products?.map((product) => {
                return (
                  <ProductCards
                    index={product.id}
                    key={product.id}
                    id={product?.id}
                    name={product?.name}
                    price={product?.price}
                    discount_percent={0}
                    discounted_price={0}
                    emi_available={true}
                    images={
                      product?.images === null ? "404.png" : product.images[0]
                    }
                    slug={product.slug}
                  />
                );
              })
            : "No products found"}
        </div>

        {/* <ProductGrid data={campaignDetailData.products} /> */}

        <Pagination
          currentPage={currentPage}
          next={campaignDetail.next}
          previous={campaignDetail.previous}
          total_pages={campaignDetail.total_pages}
          path={`/campaign/${campaignSlug}`}
        />
      </div>
    </>
  );
}
