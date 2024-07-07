import { Session } from "next-auth";

import { PaginatedResponse } from "@/lib/reusable-types";
import {
  requestHandler,
  serverProtectedRequest,
} from "@/services/serverRequest";
import { IblogDetail } from "@/app/(public)/types/blog";

//generic error handler
export const returnError = (error: any, customMessage?: string) => {
  //console.log(error)

  return {
    success: false,
    error: error.status || 500,
    message: customMessage || error.message || "Something went wrong",
    errorArray: error.errorStack,
    errorData: error.errorData,
  };
};

//generic request handler
const handleRequest = async (
  endpoint: string,
  method: string,
  session: Session | null
) => {
  try {
    const response = await serverProtectedRequest(endpoint, method, session);
    return response?.data;
  } catch (err: any) {
    return returnError(err);
  }
};

export const getAllProducts = async (
  session: Session | null,
  currentPage: any
) => {
  try {
    const pageParam = currentPage ? `?page=${currentPage}` : "";
    const response = await serverProtectedRequest(
      `products/all${pageParam}`,
      "GET",
      session
    );
    return response?.data;
  } catch (err: any) {
    returnError(err);
  }
};

export const getDeletedProducts = async (
  session: Session | null,
  currentPage: any
) => {
  const pageParam = currentPage ? `?page=${currentPage}` : "";
  const response = await requestHandler<any>(
    `cms/products/deleted/list${pageParam}`,
    "GET",
    session
  );
  return response?.data;
};

export const getAllBrands = async (
  session: Session | null,
  currentPage: any
) => {
  try {
    const pageParam = currentPage ? `?page=${currentPage}` : "";
    const response = await serverProtectedRequest(
      `products/brands/all${pageParam}`,
      "GET",
      session
    );
    return response?.data;
  } catch (err: any) {
    return returnError(err);
  }
};

export const getBrandDetailById = async (session: Session | null, id: any) => {
  return handleRequest(`cms/products/brand/info/${id}`, "GET", session);
};

export const getAllCategories = async (
  session: Session | null,
  currentPage: any
) => {
  try {
    const pageParam = currentPage ? `?page=${currentPage}` : "";
    const response = await serverProtectedRequest(
      `cms/category/table/${pageParam}`,
      "GET",
      session
    );
    return response?.data;
  } catch (err: any) {
    return returnError(err);
  }
};

export const getParentCategories = async (
  session: Session | null,
  currentPage: number
) => {
  const pageParam = currentPage ? `?page=${currentPage}` : "";
  const response = await requestHandler<PaginatedResponse<any>>(
    `category/parents/all${pageParam}`,
    "GET",
    session
  );
  return response.data;
};

export const getChildCategories = async (
  session: Session | null,
  currentPage: number
) => {
  const pageParam = currentPage ? `?page=${currentPage}` : "";
  const response = await requestHandler<PaginatedResponse<any>>(
    `category/all${pageParam}`,
    "GET",
    session
  );
  return response.data;
};

export const getParentCategoryList = async (
  session: Session | null,
  currentPage?: number
) => {
  const pageParam = currentPage ? `?page=${currentPage}` : "";
  const response = await requestHandler<any>(
    `category/parents/list${pageParam}`,
    "GET",
    session
  );
  return response.data;
};

interface CategoryType {
  id: number;
  name: string;
}
export const getCategoryTypeDetailById = async (
  session: Session | null,
  id: any
) => {
  const response = await requestHandler<CategoryType>(
    `cms/category/types/info?id=${id}`,
    "GET",
    session
  );
  return response.data;
};

export const getBankDetailById = async (session: Session | null, id: any) => {
  const response = await requestHandler<any>(
    `cms/emi/bank/info?id=${id}`,
    "GET",
    session
  );
  return response.data;
};

export const getAllOrders = async (
  session: Session | null,
  currentPage: any
) => {
  try {
    const pageParam = currentPage ? `?page=${currentPage}` : "";
    const response = await serverProtectedRequest(
      `cms/orders/list/${pageParam}`,
      "GET",
      session
    );
    return response?.data;
  } catch (err: any) {
    return returnError(err);
  }
};

interface IEmiRequest {
  count: number;
  next: string;
  previous: string;
  results: any[];
}

export const getAllEmiRequests = async (
  session: Session | null,
  currentPage: any
) => {
  try {
    const pageParam = currentPage ? `?page=${currentPage}` : "";
    const response = await serverProtectedRequest(
      `cms/emi/table${pageParam}`,
      "GET",
      session
    );
    return {
      emiRequests: response?.data,
    };
  } catch (err: any) {
    return {
      error: returnError(err),
    };
  }
};

export const getEmiDetail = async (session: Session | null, id: number) => {
  const response = await requestHandler<any>(
    `cms/emi/info/?id=${id}`,
    "GET",
    session
  );
  return response.data;
};

export const getAllBlogs = async (
  session: Session | null,
  currentPage: any
) => {
  const pageParam = currentPage ? `?page=${currentPage}` : "";
  const response = await requestHandler<PaginatedResponse<any>>(
    `blog/all/${pageParam}`,
    "GET",
    session
  );
  return response?.data;
};

export const getBlogDetailById = async (session: Session | null, id: any) => {
  const response = await requestHandler<IblogDetail>(
    `blog/detail/?slug=${id}`,
    "GET",
    session
  );
  return response.data;
};

export const getBlogCategories = async (
  session: Session | null,
  currentPage: any
) => {
  const pageParam = currentPage ? `?page=${currentPage}` : "";
  const response = await requestHandler<PaginatedResponse<any>>(
    `blog/category/all${pageParam}`,
    "GET",
    session
  );
  return response?.data;
};

export const getBlogCategoriesList = async (session: Session | null) => {
  const response = await requestHandler<any>(
    `blog/category/list`,
    "GET",
    session
  );
  return response?.data;
};

export const getBlogCategoryDetailById = async (
  session: Session | null,
  id: number
) => {
  const response = await requestHandler<any>(
    `blog/category/detail?id=${id}`,
    "GET",
    session
  );
  return response.data;
};

//banners
export interface BannerResponse {
  id: number;
  images: string[];
  link: string[];
  created_at: string;
  updated_at: string;
  banner_type: string;
}
export const getHeroBanners = async (
  session: Session | null,
  bannerType?: string
) => {
  const response = await requestHandler<PaginatedResponse<BannerResponse>>(
    `banner/get?banner_type=${bannerType || "hero"}`,
    "GET",
    session
  );
  return response.data;
};

//campaigns
// export const getAllCampaigns = async (session:Session | null, currentPage: any) => {
//   return handleRequest(`cms/campaigns/table/?page=${currentPage}`, "GET", session);
// }

type ICampaign = {
  count: number;
  next: string;
  previous: string;
  total_pages: number;
  results: {
    id: number;
    name: string;
    budget: number;
    description: string;
    image: string;
    status: boolean;
    start_date: string;
    end_date: string;
    is_active: boolean;
  }[];
};

type ICampaignParams = {
  session: Session | null;
  currentPage: number;
};

export const getAllCampaigns = async ({
  session,
  currentPage,
}: ICampaignParams) => {
  try {
    const pageParam = currentPage ? `?page=${currentPage}` : "";
    const response = await serverProtectedRequest(
      `campaigns/list/${pageParam}`,
      "GET",
      session
    );
    return response?.data;
  } catch (err: any) {
    return returnError(err);
  }
};

//banks api
export const getAllBanks = async (
  session: Session | null,
  currentPage: any
) => {
  const response = await requestHandler<PaginatedResponse<any>>(
    `cms/emi/bank/table`,
    "GET",
    session
  );
  return response.data;
};

//get all pages
export const getAllPages = async (
  session: Session | null,
  currentPage: any
) => {
  const response = await requestHandler<PaginatedResponse<any>>(
    `cms/page/list/`,
    "GET",
    session
  );
  return response.data;
};
//media

export const getUploadedMedia = async (
  session: Session | null,
  currentPage: number
) => {
  const response = await requestHandler<PaginatedResponse<any>>(
    `cms/media-library/list`,
    "GET",
    session
  );
  return response.data;
};
