import { Suspense } from "react";

import { goTry } from "go-go-try";

import { getProductReviews } from "@/api/getProductDetail";
import { Separator } from "@/components/ui/separator";

import { ReviewDialog } from "./review-dialog";

async function ProductReviews({ id }: { id: number }) {
  const [error, reviews] = await goTry(getProductReviews(id));

  if (error || !reviews) {
    return <div className="py-10 bg-white">Failed to load reviews</div>;
  }

  console.log(reviews.review_details);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start w-full max-w-layout">
        <div className="flex flex-col gap-4 w-1/3">
          <h2 className="text-[24px]">Ratings</h2>
          <div className="flex items-center gap-2">
            <span className="text-[24px] font-semibold">
              {(4.5).toFixed(1)}
            </span>
            <StarIcon className="w-5 h-5 stroke-none fill-yellow-500" />
          </div>
          <p className="text-gray-500">{`Based on reviews`}</p>

          {/* make stars for all 5 4 3 2 1 and show the number of reviews on the side */}
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-start justify-between flex-col gap-2">
              {Object.keys(reviews.review_details).map(
                (reviewStars, idx: number) => {
                  return (
                    <div className="flex items-start justify-between" key={idx}>
                      {Array.from({ length: parseInt(reviewStars) }, (_, i) => (
                        <StarIcon
                          key={i}
                          className="w-5 h-5 stroke-none fill-yellow-500"
                        />
                      ))}
                      <p className="text-gray-500">{`(${
                        reviews.review_details[parseInt(reviewStars)]
                      })`}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        <div className="h-[300px] hidden sm:block px-10">
          <Separator className="my-5" orientation="vertical" />
        </div>

        <div className="w-full  sm:hidden block">
          <Separator className="my-5" orientation="horizontal" />
        </div>
        <div className="w-full">
          <h2 className="text-[24px]">Reviews</h2>
          <ReviewDialog productId={id} />
        </div>
      </div>
      <div className="mt-10">
        <Separator />
        {reviews?.reviews.length > 0 ? (
          <div className="grid gap-12 mt-10">
            <Separator />
            <div className="grid gap-5 mt-5">
              {reviews.reviews?.splice(0, 5)?.map((review) => {
                return (
                  <div key={review.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {/* <h3 className="font-semibold">{review.}</h3> */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <StarIcon
                            key={i}
                            className="w-5 h-5 stroke-none fill-yellow-500"
                          />
                        ))}
                        {Array.from({ length: 5 - review.rating }, (_, i) => (
                          <StarIcon
                            key={i}
                            className="w-5 h-5 fill-muted-foreground stroke-none"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-500">{review.description}</p>
                    <Separator className="my-5" />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-5">This Product has no reviews</div>
        )}
      </div>
    </>
  );
}

export default function Ratings({ productId }: { productId: number }) {
  return (
    <div className="py-12 lg:py-16">
      <div className="grid grid-flow-col gap-6 lg:gap-12">
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductReviews id={productId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
