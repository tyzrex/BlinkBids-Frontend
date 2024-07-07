"use client";

import { ReactNode, useEffect, useState } from "react";

import classNames from "classnames";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/fatafat.png";

import { INavlinks, ISidebarItem } from "../componentTypes";
import { sidebarItems } from "../Sidebar/SidebarData";
import { Navlinks } from "./Navbardata";
import SearchBar from "./NavbarSearch";
import NavDropdown from "./Dropdown";
import { useRouter } from "next/navigation";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Menu, X } from "lucide-react";
import { requestHandler } from "@/services/serverRequest";

export default function MobileMenu(props: { className?: string }) {
  const [nav, setNav] = useState<Boolean>(false);

  const session = useSession();

  const getNavItemClasses = (): string => {
    return classNames(
      "flex items-center cursor-pointer w-full overflow-hidden whitespace-nowrap"
    );
  };

  const handleNav = (): void => {
    setNav(true);
  };

  const closeNav = (): void => {
    setNav(false);
  };

  useEffect(() => {
    if (nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [nav]);

  return (
    <div className={props.className}>
      <div
        onClick={closeNav}
        className={
          nav
            ? "fixed top-0 left-0 w-full h-full bg-black z-40 opacity-50 trabsition-opacity duration-500 ease-in-out"
            : "z-0 opacity-0 transition-opacity duration-500 ease-in-out"
        }
      ></div>

      <div className="w-full items py-4 max-w-layout mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="logo flex justify-center items-center gap-4">
            <button className="navbar-open" onClick={handleNav}>
              <Menu className="w-6 h-6 text-white" />
            </button>
            <Link href="/">
              <h1 className="text-2xl font-bold text-white">Blinked Bids</h1>
            </Link>
          </div>

          <div>
            <NavDropdown />
          </div>
        </div>
      </div>
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[80%] h-full bg-white z-50 overflow-y-auto transition-all duration-700 ease-in-out"
            : "fixed top-0 left-0 w-[80%] h-full bg-white z-50 overflow-y-auto transition-all duration-700 ease-in-out transform -translate-x-[100%]"
        }
      >
        <nav className=" text-white p-5 bg-accent-4 flex flex-col h-full py-2  w-full ">
          <div className="flex items-center mt-5 mb-8">
            <div className="mr-auto leading-none">
              <h1 className="text-2xl font-bold text-white">Blinked Bids</h1>
            </div>
            <button className="navbar-close" onClick={closeNav}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="h-full">
            {sidebarItems?.map((item: ISidebarItem, index: number) => {
              const classes = getNavItemClasses();
              return (
                <div className={classes} key={index}>
                  <Link href={item.href} prefetch={false}>
                    <div className="flex py-2 px-2 items-center gap-3 w-full h-full">
                      <div
                        className={` p-2 rounded-full}`}
                        style={{ width: "2.5rem" }}
                      >
                        {item.icon}
                      </div>
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          {session.status === "authenticated" ? (
            <>
              <div className="mt-auto">
                <div className="pt-6">
                  <div className="block px-4 py-4 mb-3 text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl">
                    Logged in as {session.data?.user?.name}
                  </div>
                  <button
                    onClick={() =>
                      signOut({ callbackUrl: "http://localhost:3000" })
                    }
                    className="block px-4 py-3 mb-2 leading-loose w-full text-xs text-center text-white font-semibold bg-accent-2 hover:bg-blue-700  rounded-xl"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-auto">
                <div className="pt-6">
                  <Link href="/login" prefetch={false}>
                    <div className="block px-4 py-4 mb-3 text-xs text-center font-semibold leading-none bg-white text-black rounded-xl">
                      Sign in
                    </div>
                  </Link>
                  <Link href="/register" prefetch={false}>
                    <div className="block px-4 py-3 mb-2 leading-loose text-xs text-center font-semibold bg-accent-3 text-black hover:bg-blue-700  rounded-xl">
                      Sign Up
                    </div>
                  </Link>
                </div>
                <p className="my-4 text-xs text-center text-gray-700 ">
                  <span>Copyright © Fatafat Sewa 2021</span>
                </p>
              </div>
            </>
          )}
        </nav>
      </div>

      <SearchBar />
    </div>
  );
}
