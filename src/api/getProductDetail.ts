import { IHomeProduct } from "@/app/(public)/types/home";
import { PaginatedResponse } from "@/lib/reusable-types";
import { requestHandler } from "@/services/serverRequest";
import { initSession } from "./cart";

export const getProductDetail = async (slug: string) => {
  const response = await requestHandler<any>(
    `products/product/${slug}`,
    "GET",
    null
  );
  return response.data;
};

export const getBanksList = async () => {
  const session = await initSession();
  const response = await requestHandler<PaginatedResponse<any>>(
    `emi/bank/list`,
    "GET",
    session
  );
  return response.data;
};

export const getSimilarProducts = async (slug: string) => {
  const response = await requestHandler<IHomeProduct[]>(
    `products/similar?slug=${slug}`,
    "GET",
    null
  );
  return response.data;
};

interface ReviewDetails {
  [key: number]: number;
}

interface ReviewData {
  reviews: any[];
  review_details: ReviewDetails;
}

export const getProductReviews = async (id: number) => {
  const response = await requestHandler<ReviewData>(
    `review?product=${id}`,
    "GET",
    null
  );
  return response.data;
};
