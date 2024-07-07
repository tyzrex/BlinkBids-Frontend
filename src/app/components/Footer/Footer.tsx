import Image from "next/image";
import Logo from "@/../public/logo1.webp";
import Link from "next/link";

import { footerData, socialLinks } from "./Footerdata";

const Footer = () => {
  return (
    <footer className="bg-white w-full max-w-layout">
      <div className="mx-auto space-y-8 py-16 lg:space-y-16 ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 justify-items-center lg:justify-items-stretch text-center lg:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start">
              <h1 className="text-5xl font-bold text-black">Blinked Bids</h1>
            </div>

            <div className="flex sm:justify-center flex-col items-center lg:items-start">
              <p className="text-xs sm:text-sm mt-4 max-w-xs text-gray-500">
                Blinded Bids is a platform that allows you to discover amazing
                deals. Browse through our wide selection of products and find
                the best deals available. From electronics to fashion, we have
                it all!
              </p>

              <ul className="mt-8 flex-center  gap-6">
                {socialLinks.map((link, index) => {
                  return (
                    <li
                      key={index}
                      className="p-2 bg-gray-200 rounded-full button-hover color-transition hover:text-white"
                    >
                      <Link
                        href={"#"}
                        rel="noreferrer"
                        target="_blank"
                        aria-label={link.name}
                      >
                        {link?.icon}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-3 justify-around w-full">
            {footerData?.map((item, index) => (
              <div key={index}>
                <p className="font-medium text-gray-900">{item.title}</p>

                <ul className="mt-6 space-y-4 text-xs sm:text-sm">
                  {item?.links?.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="text-gray-700 transition hover:opacity-75"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
