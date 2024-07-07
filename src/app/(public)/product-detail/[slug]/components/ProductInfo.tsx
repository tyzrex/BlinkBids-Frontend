"use client";
import { useState } from "react";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "sonner";

import { addToCart } from "@/api/cart";

import SocialShare from "./SocialShare";
import { showErrorToasts } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProductDescription from "./ProductDescription";

export default function ProductInfo(props: any) {
  const cartAdd = async (id: number) => {
    try {
      const response = await addToCart(id, 1);
      if (response.success === true) {
        toast.success(response.message);
      } else {
        showErrorToasts(response.errorData);
      }
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:w-3/4">
      <div>
        <h1 className="page-title-typography font-spline-sans">
          {props?.name}
        </h1>
      </div>
      <p className="text-gray-600">
        {props?.shortDescription
          ? props?.shortDescription
          : "No description available"}
      </p>
      <h6 className="text-2xl font-bold text-accent-2">
        Rs.
        {props?.discounted_price && props.discounted_price !== props.price ? (
          <>
            <span className="text-2xl font-bold text-accent-2">
              {props?.discounted_price}
            </span>
            <span className=" line-through ml-2 text-2xl font-bold text-accent-1">
              {props?.price}
            </span>
          </>
        ) : (
          <span className="text-2xl font-bold text-accent-2 font-spline-sans">
            {props?.price}
          </span>
        )}
      </h6>
      <div className="flex items-start flex-col gap-3">
        <div className="flex gap-2 items-center justify-between md:w-1/3 w-full">
          <h6 className="text-xl font-bold text-[15px] text-[#101010]">
            Category:
          </h6>
          <p
            className="text-gray-600
            border border-gray-300 px-2 py-1 rounded-md
          "
          >
            {props?.category}
          </p>
        </div>
      </div>
      <span className="h-[2px] w-full bg-gray-200 "></span>

      <ProductDescription description={props.description || ""} />

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full hidden md:flex md:items-center gap-2">
          <button
            onClick={() => {
              cartAdd(props.id);
            }}
            className="accent-button bg-accent-1 w-full"
          >
            Add to Cart
          </button>

          {/* <button className="bg-emerald-500 py-3 px-5 rounded-md text-white text-sm w-full">
          Buy Now
        </button> */}

          {props.emi_available && (
            <button
              onClick={applyEmiHandler}
              className="login-button w-full rounded-md text-center"
            >
              Apply for EMI
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
