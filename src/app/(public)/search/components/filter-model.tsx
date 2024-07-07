"use client";

import { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { TbFilterPlus } from "react-icons/tb";

import { getCategoriesTypes } from "@/api/sidebarApi";

import FilterProducts from "./filter-products";
import { IResProps } from "./search-filter";

interface IFilterProps {
  brands?: string[];
  query?: string | string[] | undefined;
}

export default function SearchFilterModel(props: IFilterProps) {
  const [isModelOpen, setisModelOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<IResProps>();
  const handleModelOpen = () => {
    setisModelOpen(!isModelOpen);
  };

  const getCategories = async () => {
    const response = await getCategoriesTypes();
    setCategories(response?.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (isModelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModelOpen]);

  return (
    <>
      <button onClick={handleModelOpen}>
        <TbFilterPlus className="w-6 h-6" />
      </button>
      <div
        className={
          isModelOpen
            ? "w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-10 z-10"
            : "hidden"
        }
        onClick={() => setisModelOpen(false)}
      ></div>
      <div
        className={
          isModelOpen
            ? "fixed top-0 left-0 w-[75%] h-full bg-white z-50 overflow-y-auto border-r border-r-gray-300 transition-all duration-700 ease-in-out shadow-md"
            : "fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto transition-all duration-700 ease-in-out transform -translate-x-[100%]"
        }
      >
        <div className="w-[60vw] flex-col mx-auto py-2">
          <div className="flex-between w-full">
            <span className="title-typography py-5">Filter Products</span>
            <button onClick={handleModelOpen} className="p-1 bg-accent-2 ">
              <AiOutlineClose className="w-6 h-6 text-white" />
            </button>
          </div>
          <FilterProducts
            brands={props.brands}
            categories={categories}
            closeModel={setisModelOpen}
          />
        </div>
      </div>
    </>
  );
}
