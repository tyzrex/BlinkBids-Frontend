import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  HeartIcon,
  Package2Icon,
  SearchIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "../ui/button";
export default function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-950">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="text-lg font-semibold">Blinked Bids</span>
          </Link>
          <div className="hidden md:block flex-1 max-w-md">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full rounded-md border border-gray-200 bg-gray-100 px-10 py-2 text-sm focus:border-gray-400 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50 dark:focus:border-gray-600"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </div>
          <nav className="hidden gap-4 md:flex">
            <Link
              className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
              href="#"
            >
              Home
            </Link>
            <Link
              className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
              href="#"
            >
              Shop
            </Link>
            <Link
              className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
              href="#"
            >
              About
            </Link>
            <Link
              className="text-sm font-medium hover:text-gray-900 dark:hover:text-gray-50"
              href="#"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button className="rounded-full" size="icon" variant="ghost">
              <HeartIcon className="h-5 w-5" />
              <span className="sr-only">Favorites</span>
            </Button>
            <Button className="rounded-full" size="icon" variant="ghost">
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" size="icon" variant="ghost">
                  <img
                    alt="User avatar"
                    className="rounded-full"
                    height={32}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width={32}
                  />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
