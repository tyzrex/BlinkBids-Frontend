"use client";
import Link from "next/link";
import { PanelTopClose } from "lucide-react";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "./admin-sidebar-menu";
import { useState } from "react";

export function AdminSidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed top-16 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            isOpen === false ? "translate-x-1" : "-translate-x-6"
          )}
          variant="link"
          asChild
        >
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <PanelTopClose className="w-6 h-6 mr-1" />
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              Welcome Admin
            </h1>
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20 bg-white dark:bg-primary-foreground">
      <Button
        onClick={() => setIsOpen?.()}
        className="rounded-md w-8 h-8"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
