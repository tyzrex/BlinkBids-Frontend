import { Button } from "@/components/ui/button";
import CampaignProductCard from "./campaign-product-card";
import { Product } from "@/api/campaign";
import CountdownTimer from "./countdown-timer";
import Link from "next/link";
import { EmptyCard } from "@/app/(private)/admin/components/empty-card";

interface CampaignSlideProps {
  id: number;
  name: string;
  description: string;
  end_date: string;
  products: Product[];
}

export default function CampaignSlide(props: CampaignSlideProps) {
  return (
    <>
      <section className="bg-gradient-to-r from-orange-300 via-gray-300 to-blue-200 py-10 md:py-16 px-10">
        <div className="max-w-layout mx-auto">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full lg:w-2/5">
              <h2 className="page-title-typography font-bold text-white">
                {props.name}
              </h2>
              <p className="mt-4 text-lg text-white max-w-lg">
                {props.description}
              </p>
              <CountdownTimer endDate={props.end_date} />
              <Link href={`/campaign/${props.id}`} prefetch={false}>
                <Button className="mt-6 bg-white text-gray-800">
                  Go Shopping
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block w-full lg:w-3/5 mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                {props.products.length > 0 ? (
                  props.products.map((product) => (
                    <CampaignProductCard {...product} key={product.id} />
                  ))
                ) : (
                  <div className="col-span-5">
                    <EmptyCard
                      title="No products available"
                      className="w-full "
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
