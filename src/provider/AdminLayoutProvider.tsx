"use client";

import Navbar from "@/app/(private)/admin/components/Navbar";
import Sidebar from "@/app/(private)/admin/components/Sidebar";
import { AdminSidebar } from "@/app/(private)/admin/components/admin-sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AdminLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebar, setSidebar] = useState<{
    isOpen: boolean;
    setIsOpen?: () => void;
  }>({
    isOpen: true,
    setIsOpen: () => setSidebar((prev) => ({ ...prev, isOpen: !prev.isOpen })),
  });
  return (
    <>
      <AdminSidebar isOpen={sidebar.isOpen} setIsOpen={sidebar.setIsOpen} />
      <main
        className={cn(
          "p-4 lg:p-12 mt-16 min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </>
  );
}
