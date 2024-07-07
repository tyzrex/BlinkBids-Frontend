import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Calculator - Fatafat Sewa",
  description:
    "Fatafat Sewa | Best Online Shopping for Mobile, Laptop, Gadgets, Hardware, Liquor, Appliances in Exchange with EMI Service in Nepal",
  keywords:
    "EMI Calculator, EMI Service in Nepal, EMI Shopping in Nepal, EMI Shopping, EMI, EMI Nepal, EMI Service, ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="max-w-layout">{children}</section>;
}
