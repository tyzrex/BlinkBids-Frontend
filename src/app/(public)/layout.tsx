import { Suspense } from "react";

import type { Metadata } from "next";

import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";

import SecondaryNav from "../components/Navbar/SecondaryNav";

export const metadata: Metadata = {
  title:
    "Online Shopping in Nepal. Buy Mobile, Laptop & Appliances in EMI service in Nepal - Fatafat Sewa",
  description:
    "Fatafat Sewa | Best Online Shopping for Mobile, Laptop, Gadgets, Hardware, Liquor, Appliances in Exchange with EMI Service in Nepal",
  keywords:
    "iPhone 14 Pro price in nepal, online shopping in nepal, online laptop store, online mobile shopping in nepal, fatafat sewa, Gadgets in Nepal, Latest mobiles in Nepal, Xiaomi Mobiles price in nepal, Nepal mobile phone,Redmi Price in Nepal, iPhone 13 Pro Max, samsung price in nepal, laptop price in Nepa, EMI Service in Nepal, Washing machine price in nepal, oneplus on emi, samsung washing machine price in nepal, samsung price in nepal, realme price in nepal, redmi price in nepal, iPhone 13 pro max price in nepal, iPhone price in nepal, online shopping in nepal, emi shopping in nepal",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}

      <Footer />
    </>
  );
}
