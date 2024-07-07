"use client";

import { useEffect } from "react";

import dynamic from "next/dynamic";
import {
  AiOutlineBars,
  AiOutlineDollar,
  AiOutlineFileImage,
  AiOutlineInsertRowAbove,
} from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";

import CircleLoader from "@/components/ui/CircleLoader";
import { Progress } from "@/components/ui/progress";
// import ProductForm from "./ProductForm";
import {
  ProductInfo,
  useProductFormStore,
  useProductInfoStore,
} from "@/store/products/ProductInfo";

import ImageForm from "./ImageForm";
import PricingStockForm from "./Pricing&Stock";
import SeoForm from "./SeoForm";
import SpecificationForm from "./SpecificationForm";
import Summary from "./Summary";
import ProductForm from "./ProductForm";

interface Step {
  label: string;
  component: JSX.Element;
  icon: JSX.Element;
}

const steps: Step[] = [
  {
    label: "Product Info",
    component: <ProductForm />,
    icon: <AiOutlineInsertRowAbove />,
  },
  {
    label: "Pricing Stock",
    component: <PricingStockForm />,
    icon: <AiOutlineDollar />,
  },
  {
    label: "Images",
    component: <ImageForm />,
    icon: <AiOutlineFileImage />,
  },
  {
    label: "Specifications",
    component: <SpecificationForm />,
    icon: <AiOutlineBars />,
  },

  {
    label: "SEO",
    component: <SeoForm />,
    icon: <BsGlobe />,
  },
  {
    label: "Summary",
    component: <Summary />,
    icon: <AiOutlineInsertRowAbove />,
  },
];

interface IProduct {
  productInfo: ProductInfo;
  categories: {
    name: string;
    id: number;
  }[];
  brands: {
    name: string;
    id: number;
  }[];
  product_id: number;
  campaign: any;
}

export default function FormStepper({
  productInfo,
  categories,
  brands,
  product_id,
  campaign,
}: IProduct) {
  console.log(campaign);
  const { activeStep, setStep } = useProductFormStore((state) => state);
  const {
    setProductInfo,
    setProductCategories,
    setProductBrands,
    resetProductInfo,
    setProductID,
    setProductCampaigns,
  } = useProductInfoStore((state) => state);
  useEffect(
    () => {
      setProductInfo(productInfo);
      setProductCategories(categories);
      setProductBrands(brands);
      setProductID(product_id);
      setProductCampaigns(campaign);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productInfo, categories, brands]
  );

  useEffect(() => {
    return () => {
      setStep(0);
      // resetProductInfo();
    };
  }, [setStep, resetProductInfo]);

  return (
    <>
      <div
        className="
    flex-between flex-wrap
      "
      >
        {steps.map((step, index) => (
          <div
            key={index}
            // onClick={() => {
            //   setStep(index);
            // }}
            className={`flex cursor-pointer items-center gap-2 py-3 sm:py-0  ${
              // step === index ? "text-accent-2" : "text-gray-400"
              activeStep > index ? "text-accent-2" : "text-gray-400"
            }
            ${index !== steps.length - 1 && "flex-1"}
            `}
          >
            <span
              className={`text-2xl md:text-4xl md:p-2 p-1 rounded-full text-white transition-color duration-1000 ease-in-out
            ${activeStep > index ? "bg-accent-2 " : "bg-gray-400"}    
        `}
            >
              {step.icon}
            </span>
            <span className="text-sm hidden sm:block">{step.label}</span>
            {index !== steps.length - 1 && (
              <Progress value={activeStep > index ? 100 : 0} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">{steps[activeStep].component}</div>
    </>
  );
}
