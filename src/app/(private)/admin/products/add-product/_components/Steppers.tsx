"use client";
import { useProductFormStore } from "@/store/products/ProductInfo";
import React from "react";
interface Props {
  submitForm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function FormButtons(props: Props) {
  const { activeStep, maxStep, prevStep } = useProductFormStore();

  return (
    <div className="flex flex-col sm:flex-row mt-10 justify-center sm:justify-between items-center gap-3 col-span-6">
      <button
        disabled={activeStep === 0}
        onClick={prevStep}
        className={`w-full md:w-[200px] py-3 text-white rounded-md text-sm font-bold
            ${activeStep === 0 ? `bg-gray-300` : `bg-accent-1`}
            `}
      >
        <span className="inline-block">Back</span>
      </button>

      <button
        className="w-full md:w-[200px] py-3 text-white rounded-md text-sm font-bold bg-accent-2"
        onClick={props.submitForm}
      >
        <span className="inline-block">
          {activeStep === maxStep ? "Submit" : "Continue"}
        </span>
      </button>
    </div>
  );
}
