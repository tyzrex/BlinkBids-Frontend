import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdOutlineCompareArrows } from "react-icons/md";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "../Navbar/NavbarSearch";

export default function BottomBar() {
  return (
    <>
      <nav className="w-screen block md:hidden fixed bottom-0 bg-accent-2 shadow-lg z-10">
        <div className="flex justify-center w-full items-center h-12 gap-10">
          <div className="w-full flex-around">
            <Sheet key={"top"}>
              <SheetTrigger asChild>
                <AiOutlineSearch className="text-white h-6 w-6 fill-current" />
              </SheetTrigger>
              <SheetContent side={"top"} className="h-32 w-full">
                <SearchBar />
              </SheetContent>
            </Sheet>

            <Link href="/user/cart">
              <AiOutlineShoppingCart className="text-white h-6 w-6 fill-current" />
            </Link>
            <Link href={"/"}>
              <MdOutlineCompareArrows className="text-white h-6 w-6 fill-current" />
            </Link>
            <Link href="/">
              <AiOutlineUser className="text-white h-6 w-6 fill-current" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
