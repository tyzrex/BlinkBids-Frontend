"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "sonner";

import { searchRecomendations } from "@/api/search";
import { IProductDetail } from "@/app/(public)/types/product";
import usePushRouter from "@/hooks/usePushRouter";

interface ISearchProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    brands: any[];
    products: IProductDetail[];
  };
  total_pages: number;
}

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ISearchProps>();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);
  const router = usePushRouter();
  // const params = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const suggestions = async () => {
    const searchResult = await searchRecomendations(searchInput);
    console.log(searchResult);
    if (searchResult) {
      setSearchResult(searchResult);
    }
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      setIsSearchBarOpen(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(async () => {
        await suggestions();
      }, 300);
    } else {
      setIsSearchBarOpen(false);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.length === 0) {
      toast.warning("Please enter a search term");
      return;
    }

    router.push(`/search?query=${searchInput}`);
  };

  return (
    <nav className="w-full lg:flex items-center justify-center py-4  lg:py-0 ">
      <div className="max-w-layout flex justify-center w-full items-center gap-10">
        <div
          className={
            isSearchBarOpen
              ? "w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-10 z-10"
              : "hidden"
          }
          onClick={() => setIsSearchBarOpen(false)}
        ></div>
        <div
          className={
            isSearchBarOpen
              ? "relative mx-auto text-gray-600 w-full z-50"
              : "relative mx-auto text-gray-600 w-full z-0"
          }
        >
          <form onSubmit={submitHandler} className="flex-center">
            <input
              className="  w-full bg-white h-[45px] px-5 rounded-xl text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search for products here"
              value={searchInput}
              onChange={handleChange}
              autoComplete="off"
            />
            <button
              type="submit"
              onClick={() => setIsSearchBarOpen(false)}
              className=" h-[32px] bg-accent-1 px-2 absolute rounded-full right-2 color-transition hover:bg-accent-3"
            >
              <AiOutlineSearch className="text-white h-4 w-4  fill-current" />
            </button>
          </form>

          <div className="flex flex-col gap-2 absolute top-14 rounded-lg w-full bg-white z-10">
            {isSearchBarOpen ? (
              searchResult?.results?.products?.length !== 0 ? (
                searchResult?.results?.products
                  .splice(0, 10)
                  .map((item: any) => {
                    return (
                      <Link
                        href={`/product-detail/${item.slug}`}
                        key={item.id}
                        prefetch={false}
                        onClick={() => setIsSearchBarOpen(false)}
                      >
                        <div className="flex items-center justify-between px-4 py-2 hover:bg-accent-3 hover:text-white cursor-pointer">
                          <span>{item.name}</span>
                          <span className="text-accent-3">
                            in {item.category__name}
                          </span>
                        </div>
                      </Link>
                    );
                  })
              ) : (
                <span className="flex-center py-4 text-gray-500">
                  No results found
                </span>
              )
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
