"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";

import { ISidebarItem } from "../componentTypes";
import { sidebarItems } from "./SidebarData";

const Sidebar: React.FC = () => {
  const [toggleCollapse, setToggleCollapse] = useState<boolean>(true);
  const [toggleSubMenu, setToggleSubMenu] = useState<boolean>(false);

  const wrapperClasses = classNames(
    "fixed left-0 top-0 bg-white z-10 hidden h-screen shadow-lg pb-4 lg:flex items-start flex-col text-black overflow-hidden",
    {
      ["w-80"]: !toggleCollapse,
      ["w-14"]: toggleCollapse,
    }
  );

  const getNavItemClasses = (): string => {
    return classNames(
      "flex items-center cursor-pointer w-full overflow-hidden whitespace-nowrap"
    );
  };

  const mouseEnter = (): void => {
    setToggleCollapse(false);
  };

  const mouseLeave = (): void => {
    setToggleCollapse(true);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col items-center mt-2 w-full">
        {sidebarItems?.map((item: ISidebarItem, index: number) => {
          const classes = getNavItemClasses();
          return (
            <div
              className={`${classes} w-full hover:bg-accent-1 color-transition hover:text-white`}
              key={index}
            >
              <Link href={item.href}>
                <div className="flex py-2 px-2 items-center gap-3 w-full h-full relative">
                  <div
                    className={`${item.className} p-2 rounded-full}`}
                    style={{ width: "2.5rem" }}
                  >
                    {item.icon}
                  </div>

                  {!toggleCollapse && (
                    <span
                      className={classNames(
                        "text-md font-medium text-text-light flex-between"
                      )}
                    >
                      <span>{item.label}</span>
                      {
                        <span className="ml-auto text-gray-300">
                          {item.rightIcon && item.rightIcon}
                        </span>
                      }
                    </span>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
