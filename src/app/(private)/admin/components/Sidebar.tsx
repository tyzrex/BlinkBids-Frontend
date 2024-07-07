"use client";

import React, { useMemo, useState } from "react";

import Link from "next/link";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

// Define TypeScript types
type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  subCategories?: SidebarItem[];
};

type SidebarState = Record<string, boolean>;

interface SidebarProps {
  items: SidebarItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  const [openSubmenus, setOpenSubmenus] = useState<SidebarState>({});

  const handleToggleSubMenu = (index: number) => {
    setOpenSubmenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const memoizedOpenSubmenus = useMemo(() => openSubmenus, [openSubmenus]);

  const renderSubCategory = (item: SidebarItem, index: number) => (
    <div
      className={memoizedOpenSubmenus[index] ? "block ml-2 pb-2" : "hidden"}
      key={index}
    >
      {item.subCategories && (
        <ul className="ml-2 pb-2">
          {item.subCategories.map((subItem, subIndex) => (
            <li key={subIndex}>
              <Link
                prefetch={false}
                href={subItem.href}
                className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
              >
                <div className="w-6 h-6 text-accent-2 flex-shrink-0 group-hover:text-gray-900 transition duration-75">
                  {subItem.icon}
                </div>
                <span className="ml-3 xl:block hidden">{subItem.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <aside
      id="sidebar"
      className="fixed z-20 h-full xl:top-0 left-0 xl:pt-16 flex flex-shrink-0 flex-col w-16 xl:w-72 transition-width ease-in-out duration-500 overflow-y-scroll no-scrollbar"
      aria-label="Sidebar"
    >
      <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-5">
        <div className="flex-1 px-1 xl:px-3 bg-white divide-y space-y-1">
          <ul className="space-y-2 ml-2 pb-2">
            {items.map((item, index) => (
              <li key={index}>
                {item.subCategories ? (
                  <div
                    className="flex hover:bg-gray-100 duration-400 transition-colors px-1 py-2 rounded-md cursor-pointer"
                    onClick={() => {
                      if (item.subCategories) {
                        handleToggleSubMenu(index);
                      }
                    }}
                  >
                    <div className="w-6 h-6 text-accent-1 flex-shrink-0 group-hover:text-gray-900 transition duration-75">
                      {item.icon}
                    </div>
                    <span className="ml-3 xl:block hidden">{item.label}</span>
                    {item.subCategories && (
                      <div className="ml-auto my-auto">
                        {memoizedOpenSubmenus[index] ? (
                          <AiOutlineUp />
                        ) : (
                          <AiOutlineDown />
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    prefetch={false}
                    href={item.href}
                    className="text-base text-gray-900 font-normal rounded-lg flex items-center px-1 py-2 hover:bg-gray-100 group"
                  >
                    <div className="w-6 h-6 text-accent-1 flex-shrink-0 group-hover:text-gray-900 transition duration-75">
                      {item.icon}
                    </div>
                    <span className="ml-3 xl:block hidden">{item.label}</span>
                  </Link>
                )}
                {item.subCategories && renderSubCategory(item, index)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
