"use client";
import React from "react";
import { useEmiFormStore } from "@/store/emiform";

interface Props {
  submitForm: () => void;
}
export default function StepperButtons(props: Props) {
  const { activeStep, nextStep, prevStep } = useEmiFormStore();

  return (
    <div className="flex flex-col sm:flex-row  justify-center sm:justify-between items-center gap-3 col-span-6">
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
          {activeStep === 2 ? "Submit" : "Continue"}
        </span>
      </button>
    </div>
  );
}
