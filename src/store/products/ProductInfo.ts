import { create } from "zustand";

type CategoryBrandList = {
  name: string;
  id: number;
};

type ProductInfoStore = {
  product_id: number;
  productInfo: ProductInfo;
  categories: CategoryBrandList[];
  brands: CategoryBrandList[];
  attributes: any;
  campaigns: any;
  setAttributes: (attributes: any) => void;
  setProductCategories: (categories: CategoryBrandList[]) => void;
  setProductBrands: (brands: CategoryBrandList[]) => void;
  setProductInfo: (productInfo: ProductInfo) => void;
  setProductID: (product_id: number) => void;
  setProductCampaigns: (campaigns: any) => void;
  resetProductInfo: () => void;
};

export type ProductInfo = {
  id?: number;
  name: string;
  sku: string;
  short_description: string;
  slug: string;
  category: any;
  description: string;
  brand: any;
  highlights: string;
  status: boolean;
  price: number;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  images: string[];
  thumbnails: string[];
  previews: string[];
  discounted_price: number;
  discount_percent: number;
  warranty: string;
  new_images: File[];
  custom_code: string;
  emi_available: boolean;
  attributes: [];
  campaign: number | null;
};

const initialProductInfo: ProductInfo = {
  name: "",
  sku: "",
  slug: "",
  short_description: "",
  price: 0,
  category: "",
  warranty: "",
  description: "",
  brand: "",
  highlights: "",
  status: true,
  meta_title: "",
  meta_keywords: "",
  meta_description: "",
  images: [],
  thumbnails: [],
  previews: [],
  discounted_price: 0,
  discount_percent: 0,
  new_images: [],
  custom_code: "",
  emi_available: false,
  attributes: [],
  campaign: null,
};

export const useProductInfoStore = create<ProductInfoStore>((set, get) => ({
  product_id: 0,
  productInfo: {
    ...initialProductInfo,
  },
  campaigns: [],
  setProductCampaigns: (campaigns) => {
    set({ campaigns });
  },
  setProductInfo: (productInfo) => {
    set({ productInfo });
  },
  categories: [],
  setProductCategories: (categories) => {
    set({ categories });
  },
  brands: [],
  setProductBrands: (brands) => {
    set({ brands });
  },
  attributes: [],
  setAttributes: (attributes) => {
    set({ attributes });
  },
  setProductID: (id) => {
    set({ product_id: id });
  },
  resetProductInfo: () => {
    set({ productInfo: { ...initialProductInfo } });
  },
}));

const maxStep = 5;

type ProductFormStore = {
  activeStep: number;
  maxStep: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
};

export const useProductFormStore = create<ProductFormStore>((set, get) => ({
  activeStep: 0,
  maxStep: 5,
  nextStep: () => {
    set((state) =>
      maxStep === state.activeStep
        ? { activeStep: maxStep }
        : { activeStep: state.activeStep + 1 }
    );
  },
  prevStep: () => {
    set((state) =>
      state.activeStep === 0
        ? { activeStep: 0 }
        : { activeStep: state.activeStep - 1 }
    );
  },
  setStep: (step) => {
    set({ activeStep: step });
  },
}));
