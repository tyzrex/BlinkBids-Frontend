"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

interface Props {
  query: string | string[] | undefined;
}

export default function SortProducts(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="flex-center">
        {/* sort  */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              id="menu-button"
              aria-expanded="false"
              aria-haspopup="true"
              onClick={() => setIsOpen(!isOpen)}
            >
              Sort
              <AiOutlineDown className="ml-2 mt-1" />
            </button>
          </div>
          <div
            className={
              isOpen
                ? "absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                : "hidden"
            }
            onBlur={() => setIsOpen(false)}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              <Link
                prefetch={false}
                href={`/search?query=${props?.query}`}
                className="font-medium text-gray-900 block px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-0"
              >
                Best Match
              </Link>

              <Link
                prefetch={false}
                href={`/search?query=${props?.query}&sort=price`}
                className="text-gray-500 block px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-3"
              >
                Price: Low to High
              </Link>
              <Link
                prefetch={false}
                href={`/search?query=${props?.query}&sort=-price`}
                className="text-gray-500 block px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-4"
              >
                Price: High to Low
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
