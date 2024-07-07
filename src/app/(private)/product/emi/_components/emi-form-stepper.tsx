"use client";

import {
  AiOutlineBank,
  AiOutlineCreditCard,
  AiOutlineUserAdd,
} from "react-icons/ai";

import { Progress } from "@/components/ui/progress";
import { useEmiFormStore, usePersonalInformationStore } from "@/store/emiform";

// import BankForm from "./bank-info-form";
// import EmiForm from "./emi-info-form";
// import PersonalhtmlForm from "./personal-info-form";
import { useBankFormStore } from "@/store/bankForm";
import { useEmiInfoStore } from "@/store/emiInfo";
import { lazy, useEffect } from "react";

const PersonalhtmlForm = lazy(() => import("./personal-info-form"));
const BankForm = lazy(() => import("./bank-info-form"));
const EmiForm = lazy(() => import("./emi-info-form"));

interface Step {
  label: string;
  component: JSX.Element;
  icon: JSX.Element;
}

const steps: Step[] = [
  {
    label: "Personal Details",
    component: <PersonalhtmlForm />,
    icon: <AiOutlineUserAdd />,
  },
  {
    label: "Bank Details",
    component: <BankForm />,
    icon: <AiOutlineBank />,
  },
  {
    label: "EMI Details",
    component: <EmiForm />,
    icon: <AiOutlineCreditCard />,
  },
];

export default function FormStepper() {
  const { activeStep, setStep } = useEmiFormStore();
  const { clearBankInformation, setHasCreditCard } = useBankFormStore();
  const { clearPersonalInformation } = usePersonalInformationStore();
  const { resetEmiInfo } = useEmiInfoStore();

  useEffect(() => {
    return () => {
      setStep(0);
      clearBankInformation();
      clearPersonalInformation();
      resetEmiInfo();
    };
  }, []);

  return (
    <>
      <div
        className="
    flex-between 
      "
      >
        {steps.map((step, index) => (
          <div
            key={index}
            onClick={() => {
              setStep(index);
            }}
            className={`flex cursor-pointer items-center gap-2 py-3 sm:py-0  ${
              // step === index ? "text-accent-2" : "text-gray-400"
              activeStep > index ? "text-accent-2" : "text-gray-400"
            }
            ${index !== steps.length - 1 && "flex-1"}
            `}
          >
            <span
              className={`text-2xl md:text-4xl md:p-2 p-1 rounded-full text-white transition-color duration-1000 ease-in-out
            ${activeStep > index ? "bg-accent-2 " : "bg-gray-400"}    
        `}
            >
              {step.icon}
            </span>
            <span className="text-sm hidden sm:block">{step.label}</span>
            {index !== steps.length - 1 && (
              <Progress value={activeStep > index ? 100 : 0} />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">{steps[activeStep].component}</div>
    </>
  );
}
