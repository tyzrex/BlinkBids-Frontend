import Image from "next/image";
import Link from "next/link";
import Logo from "public/fatafat.png";

import NavDropdown from "./Dropdown";
import MobileMenu from "./MobileMenu";
import SearchBar from "./NavbarSearch";

const Navbar = async () => {
  return (
    <header className="bg-accent-1 sticky top-0 z-10">
      <div
        id="navbar"
        className="z-1 justify-center items-center text-black py-4 hidden lg:flex"
      >
        <div className="max-w-layout flex justify-center w-full items-center z-10">
          <div className="flex justify-between items-center w-full">
            <div className="flex-center gap-10 ">
              <div className="logo flex justify-center items-center gap-4">
                <Link prefetch={false} href="/">
                  {/* <Image
                    src={Logo}
                    alt="logo"
                    className="max-w-[120px] sm:max-w-[170px]"
                  /> */}
                  <h1 className="text-2xl font-bold text-white">
                    Blinked Bids
                  </h1>
                </Link>
              </div>
            </div>
            <div className="w-[60%]">
              <SearchBar />
            </div>
            <div className="z-10">
              <NavDropdown />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <MobileMenu />
      </div>
    </header>
  );
};

export default Navbar;
