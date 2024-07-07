import { PaginatedResponse } from "@/lib/reusable-types";
import { requestHandler } from "@/services/serverRequest";

export interface Offer {
  id: number;
  name: string;
  start_date: string; // format: "YYYY-MM-DD"
  end_date: string; // format: "YYYY-MM-DD"
  image: string; // Image file name
  products: any[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[]; // Array of image file names
  slug: string;
}

export const getHomepageCampaign = async () => {
  const response = await requestHandler<PaginatedResponse<Offer>>(
    "campaigns/active",
    "GET",
    null
  );
  return response.data;
};

export const getCampaignBySlug = async (slug: string) => {
  const response = await requestHandler<PaginatedResponse<Offer>>(
    `campaigns/info/?id=${slug}`,
    "GET",
    null
  );
  return response.data;
};
