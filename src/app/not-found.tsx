import Link from "next/link";
import Navbar from "./components/Navbar/Navbar";
import SecondaryNav from "./components/Navbar/SecondaryNav";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found - fatafatsewa.com",
  description: "404 Not Found - fatafatsewa.com",
  keywords: "404 Not Found - fatafatsewa.com",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <SecondaryNav />
      <div className="h-[80vh] w-screen max-w-layout flex items-center">
        <div className="container flex text-center items-center justify-center px-5 text-gray-700">
          <div className="w-full mx-8">
            <div className="text-7xl text-accent-1 font-extrabold mb-8">
              404 Not Found
            </div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
              Sorry we couldn&apos;t find the page you&apos;re looking for
            </p>

            <Link
              href="/"
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-accent-1 active:bg-red-600 hover:bg-red-700"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
