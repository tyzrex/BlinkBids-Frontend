import { Suspense } from "react";

import HomeProducts from "./_components/product-categories/home-products";
import ProductCategories from "./_components/product-categories/product-categories";
import BlogSection from "./_components/sections/blog-section";
import FAQ from "./_components/sections/faq-section";
import FatafatFeatures from "./_components/sections/site-features";
import BannerWrapper from "./_components/swipers/banner-wrapper";
import { CampaignsSection } from "./_components/sections/campaign-section";
import MobileProductCategories from "./_components/product-categories/mobile-categories";
import HeroSwiper from "./_components/swipers/hero-swiper";
import { requestHandler } from "@/services/serverRequest";
import { goTry } from "go-go-try";
import ErrorComponent from "@/components/Error";
import HomeProductsNew from "./_components/product-categories/home-prodducts-new";

async function getHomeCategoriesAndProducts() {
  const response = await requestHandler("products/homepage/", "GET", null);
  return response?.data as any;
}

export default async function Home() {
  const [error, data] = await goTry(getHomeCategoriesAndProducts());

  if (error) {
    <ErrorComponent error={"404"} message="An error occurred" />;
  }

  console.log(data);

  return (
    <main className="max-w-layout">
      {/* <Suspense fallback={<div>Loading...</div>}>
        <BannerWrapper banner_type="hero" />
      </Suspense> */}
      <HeroSwiper />

      <MobileProductCategories />
      <ProductCategories />
      {/* <HomeProducts category="new" name="New Products" /> */}

      {data.map((category: any) => (
        <HomeProductsNew
          category={category.name}
          name={category.name}
          newProducts={category.category_products}
          className="title-typography"
        />
      ))}
    </main>
  );
}
