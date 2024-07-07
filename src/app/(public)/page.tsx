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

export default async function Home() {
  return (
    <main className="max-w-layout">
      {/* <Suspense fallback={<div>Loading...</div>}>
        <BannerWrapper banner_type="hero" />
      </Suspense> */}
      <HeroSwiper />

      <MobileProductCategories />
      <ProductCategories />
      {/* <HomeProducts category="new" name="New Products" /> */}
      <HomeProducts
        category="Mobile Phones"
        name="Mobile Phones"
        className="title-typography"
      />
    </main>
  );
}
