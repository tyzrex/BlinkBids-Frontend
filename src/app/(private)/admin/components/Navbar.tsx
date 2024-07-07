import Link from "next/link";
// import LogOutButton from "@/app/components/Navbar/LogOut";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import NavDropdown from "@/app/components/Navbar/Dropdown";

export default function Navbar() {
  return (
    <>
      <nav className="bg-white top-0 border-b border-gray-200 z-30 w-full fixed">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link
                prefetch={false}
                href="/user/dashboard"
                className="text-xl font-bold flex items-center lg:ml-2.5"
              >
                <h1 className="text-2xl font-bold text-main-foreground">
                  FS
                  <span className="text-accent-1">ADMIN</span>
                </h1>
              </Link>
              <form
                action="#"
                method="GET"
                className="hidden lg:block lg:pl-20"
              >
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="mt-1 relative lg:w-64">
                  <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none"></div>
                  <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>

            <NavDropdown />
          </div>
        </div>
      </nav>
    </>
  );
}
