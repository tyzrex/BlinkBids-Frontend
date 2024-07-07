import { Suspense } from "react";

import type { Metadata } from "next";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { sidebarItems } from "./components/SidebarData";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./components/admin-sidebar";
import AdminLayoutProvider from "@/provider/AdminLayoutProvider";

export const metadata: Metadata = {
  title: "FatafatSewa Admin Portal",
  description:
    "FatafatSewa Admin Portal Edit, Delete and Add New products, categories and brands",
  keywords: "admin admin site",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  if (!session?.user) {
    redirect("/");
  }
  return (
    <>
      {/* <Navbar /> */}
      <Navbar />
      <AdminLayoutProvider>{children}</AdminLayoutProvider>
    </>
  );
}
