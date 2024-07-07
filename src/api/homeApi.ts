import { IHomeProducts } from "@/app/(public)/types/home";
import { FP_MESSAGE } from "@/lib/fpMessage";
import { PaginatedResponse } from "@/lib/reusable-types";
import { GetRequest } from "@/services/httpRequest";
import { requestHandler } from "@/services/requestHandler";
import { requestHandler as reqHandler } from "@/services/serverRequest";

import { BannerResponse } from "./cms";

interface ICategories {
  category: string;
  name?: string;
}

export const getHomeProductsByCategory = async (params: ICategories) => {
  const response = await reqHandler<any>(
    `products/all?category=${params?.category}`,
    "GET",
    null
  );
  return response.data;
};

export const getHomeBlogs = async (page?: number) => {
  const paramPage = page ? page : 1;
  const response = await reqHandler<PaginatedResponse<any>>(
    `blog/all?page=${paramPage}`,
    "GET",
    null
  );
  return response.data;
};

export const getBlogbyID = async (slug: string) => {
  const response = await reqHandler<any>(
    `blog/detail/?slug=${slug}`,
    "GET",
    null
  );
  return response.data;
};

export const getPageDetail = async (pageName: string) => {
  const response = await reqHandler<any>(
    `page/detail/${pageName}/`,
    "GET",
    null
  );
  return response.data;
};

export const getHomeBanners = async (banner_type: string) => {
  const response = await reqHandler<PaginatedResponse<BannerResponse>>(
    `banner/get?banner_type=${banner_type}`,
    "GET",
    null
  );
  return response.data;
};
