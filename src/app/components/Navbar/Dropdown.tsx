"use client";

import classNames from "classnames";
import { ShoppingCart } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import LogOut from "./LogOut";
import { Button } from "@/components/ui/button";

const iconsClasses = (): string => {
  return classNames("h-6 w-6");
};
const itemDivClasses = (): string => {
  return classNames(
    "bg-white",
    "rounded-full",
    "border",
    "border-accent-2",
    "p-2",
    "color-transition",
    "hover:bg-accent-3 hover:text-white",
    "cursor-pointer",
    "text-accent-2"
  );
};

const AuthenticatedContent = ({ sessionData }: { sessionData: any }) => {
  return (
    <>
      <div className="flex-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
              <span className="text-gray-700 font-medium text-lg leading-none">
                {sessionData?.user?.name?.charAt(0)}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{sessionData?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <Link href={"/user/orders"} prefetch={false}>
              <DropdownMenuItem className="cursor-pointer">
                Orders
              </DropdownMenuItem>
            </Link>

            <Link href={"/user/cart"} prefetch={false}>
              <DropdownMenuItem className="cursor-pointer">
                My Cart
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <LogOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href={`/user/cart`} prefetch={false} className="relative">
          <div className={itemDivClasses()}>
            <ShoppingCart className={iconsClasses()} />
          </div>
        </Link>
      </div>
    </>
  );
};

const GuestContent = () => {
  return (
    <>
      <div className="font-medium flex-center gap-2">
        <Link prefetch={false} href="/login">
          <button className="text-white hover:text-accent-3 font-bold text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 rounded-full color-transition">
            Login
          </button>
        </Link>

        <Link prefetch={false} href="/register">
          <Button className="text-black bg-accent-3 font-bold text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 color-transition">
            Register
          </Button>
        </Link>
      </div>
    </>
  );
};
export default function NavDropdown() {
  const session = useSession();

  return (
    <>
      {session.status === "authenticated" ? (
        <AuthenticatedContent sessionData={session.data} />
      ) : session.status === "loading" ? (
        <div>
          <div className="flex-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <GuestContent />
      )}
    </>
  );
}
