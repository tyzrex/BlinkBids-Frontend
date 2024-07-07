import { IProductCardsProps } from './home';

export interface IProductDetail {
    id: number;
    images : string[];
    thumbnails : string[];
    previews : string[];
    name : string;
    short_description? : string;
    description? : string;
    price : number;
    highlights? : string;
    meta_title? : string;
    meta_description? : string;
    meta_keywords? : string;
    created_at : string;
    updated_at : string;
    category : string;
    brand : string;
    sku : string;
    slug : string;
    discounted_price: number | null;
    emi_available: boolean;
}
export interface Category {
  id: number;
  name: string;
}

export interface ISearchResProps {
  next: string | null;
  previous: string | null;
  total_pages: number;
  query: string | string[] | undefined;
  results: {
    brands?: string[];
    products: IProductCardsProps[];
  }
  count: number;
}

export type BrandProducts = {
    id: number;
    name: string;
    slug: string;
    short_description: string | null;
    description: string;
    sku: string;
    price: number;
    highlights: string | null;
    meta_title: string | null;
    meta_keywords: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
    category: string;
    brand: string;
    images: string | null;
    discounted_price: number | null;
    discount_percent: number;
    attributes: string | null;
    emi_available: boolean;
}

export type BrandProductssResponse = {
    brand_details: any;

    count: number;
    next: string | null;
    previous: string | null;
    results: BrandProducts[];
    num_pages: number;
}