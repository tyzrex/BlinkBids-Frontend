import "./globals.scss";

import { Suspense } from "react";

import type { Metadata } from "next";
import { Marcellus, Mulish, Outfit, Spline_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

import NextAuthProvider from "@/provider/Authprovider";

import NProgressTop from "./components/Nploader/NPLoaderTop";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { Auth } from "@/provider/TokenProvider";

const outfit = Marcellus({
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  weight: "400",
  subsets: ["latin-ext"],
  variable: "--font-outfit",
});

const spline_sans = Mulish({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin-ext"],
  variable: "--font-spline-sans",
});
export const metadata: Metadata = {
  title:
    "Online Shopping in Nepal. Buy Mobile, Laptop & Appliances in EMI service in Nepal - Fatafat Sewa",
  description:
    "Fatafat Sewa | Best Online Shopping for Mobile, Laptop, Gadgets, Hardware, Liquor, Appliances in Exchange with EMI Service in Nepal",
  keywords:
    "iPhone 14 Pro price in nepal, online shopping in nepal, online laptop store, online mobile shopping in nepal, fatafat sewa, Gadgets in Nepal, Latest mobiles in Nepal, Xiaomi Mobiles price in nepal, Nepal mobile phone,Redmi Price in Nepal, iPhone 13 Pro Max, samsung price in nepal, laptop price in Nepa, EMI Service in Nepal, Washing machine price in nepal, oneplus on emi, samsung washing machine price in nepal, samsung price in nepal, realme price in nepal, redmi price in nepal, iPhone 13 pro max price in nepal, iPhone price in nepal, online shopping in nepal, emi shopping in nepal",
};

// export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={outfit.variable + " " + spline_sans.variable}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <Toaster richColors />
            <Suspense fallback={null}>
              <NextTopLoader />
              <NProgressTop />
              <Auth />
            </Suspense>
            {children}
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
