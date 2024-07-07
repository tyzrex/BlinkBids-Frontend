import Link from "next/link";

import { secondaryNavLinks } from "./Navbardata";
import { BrandCombobox } from "./BrandDropdown";

export default async function SecondaryNav() {
  return (
    <>
      <nav className="hidden md:block bg-white border-b border-b-gray-300">
        <div className="flex items-center overflow-hidden text-[12px] md:text-[14px] font-semibold  max-w-layout overflow-x-scroll no-scrollbar py-2 md:py-4 text-black gap-5">
          {/* <BrandCombobox />
          {secondaryNavLinks.map((item: any, index: number) => (
            <Link
              prefetch={false}
              href={item.href}
              key={index}
              className="cursor-pointer"
            >
              <div>{item?.name}</div>
            </Link>
          ))} */}
        </div>
      </nav>
    </>
  );
}
