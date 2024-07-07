import { GetRequest } from "@/services/httpRequest";
import { serverRequest } from "@/services/serverRequest";

import { returnError } from "./cms";

interface ISearchParams {
  query?: string;
  page?: number;
  sort?: string;
  min?: number;
  max?: number;
  brand?: string[];
  category?: string[];
}

export const searchProducts = async (params: ISearchParams) => {
  try {
    const sortParam = params?.sort ? `&sort=${params?.sort}` : "";
    const minPriceParam = params?.min ? `&min=${params?.min}` : "";
    const maxPriceParam = params?.max ? `&max=${params?.max}` : "";
    const brandParam = params?.brand ? `&brand=${params?.brand}` : "";
    const categoryParam = params?.category ? `&type=${params?.category}` : "";
    const url = `products/search/?query=${params?.query}&page=${
      params?.page || 1
    }${sortParam}${minPriceParam}${maxPriceParam}${brandParam}${categoryParam}`;
    const response = await serverRequest(url, "GET");
    return response?.data;
  } catch (error) {
    return {
      error: returnError(error),
    };
  }
};

export const searchRecomendations = async (searchInput: string) => {
  try {
    const response = await GetRequest(`products/search?query=${searchInput}`);
    return response.data;
  } catch (error) {
    //console.log(error);
    return returnError(error);
  }
};
