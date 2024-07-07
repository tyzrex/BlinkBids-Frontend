import { Suspense } from "react";

import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import SecondaryNav from "@/app/components/Navbar/SecondaryNav";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Navbar />
      <SecondaryNav />
      <main className="max-w-layout">{children}</main>
      <footer className="bg-white ">
        <Footer />
      </footer>
    </>
  );
}
