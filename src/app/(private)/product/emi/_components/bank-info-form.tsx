"use client";
import { FC, useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import FileInput from "@/app/(private)/admin/components/FileInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BankInformation, useBankFormStore } from "@/store/bankForm";
import { useEmiFormStore } from "@/store/emiform";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  hasCardBankSchema,
  hasCardBankSchemaType,
  noCardBankSchema,
  noCardBankSchemaType,
} from "../../../../../schema/emi/bank-form-schema";
import StepperButtons from "./emi-stepper-buttons";
import { Input } from "@/components/ui/input";

interface FormProps {
  register: any;
  errors: Record<string, any>;
  fields: Array<{
    id: string;
    label: string;
    registerName: string;
    isFile?: boolean;
    colSpan?: string;
    options?: any;
  }>;
  watch?: any;
  setValue?: any;
  clearErrors?: any;
  getValues?: any;
}

const Form: FC<FormProps> = ({
  register,
  errors,
  fields,
  watch,
  setValue,
  clearErrors,
  getValues,
}) => {
  const { bankInformation, has_credit_card, banks_list } = useBankFormStore();

  const [cardNumber, setCardNumber] = useState<string>(
    getValues("credit_card_number")
  );

  const [expiryDate, setExpiryDate] = useState<string>(
    getValues("credit_card_expiration")
  );

  const handleCardInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    const onlyNums = value.replace(/\D/g, "");
    let formattedNumber = "";

    // Break the input into groups of 4 digits separated by a space
    for (let i = 0; i < onlyNums.length; i += 4) {
      if (formattedNumber.length > 0) {
        formattedNumber += " ";
      }
      formattedNumber += onlyNums.substring(
        i,
        Math.min(i + 4, onlyNums.length)
      );
    }

    setCardNumber(formattedNumber);
  };

  const handleExpiryDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;

    console.log(value);

    const formattedNumber = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{2})/, "$1/$2")
      .replace(/(\/\d{2})\d+/, "$1");

    setExpiryDate(formattedNumber);
  };

  return (
    <>
      <section className="flex flex-col-reverse md:flex-row justify-between">
        <form
          className={
            "grid gap-4 text-sm grid-cols-1 md:grid-cols-6" +
            (has_credit_card ? " md:w-full" : " md:w-55%")
          }
        >
          {fields.map(
            ({ id, label, registerName, isFile, colSpan, options }) => (
              <div key={id} className={colSpan ? colSpan : "col-span-6"}>
                {isFile ? (
                  <>
                    <FileInput
                      errors={errors?.[registerName]?.message}
                      label={label}
                      register={register}
                      registerName={registerName}
                      watch={watch}
                      imageValue={watch?.[registerName]?.[0]}
                    />
                  </>
                ) : registerName === "bank" ? (
                  <>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor={label}
                    >
                      {label}
                    </label>
                    <Select
                      onValueChange={(value) => {
                        setValue(registerName, value);
                        clearErrors(registerName);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <Input
                          value={
                            banks_list?.find(
                              (bank: any) =>
                                bank.id === parseInt(watch?.["bank"])
                            )?.bank_name ?? ""
                          }
                          onChange={() => {}}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {options?.map((option: any, idx: number) => (
                            <SelectItem value={option.id} key={idx}>
                              {option.bank_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </>
                ) : options ? (
                  <>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor={label}
                    >
                      {label}
                    </label>
                    <div className="mt-1">
                      <Select
                        value={watch?.[registerName]}
                        onValueChange={(value) => {
                          //console.log(value);
                          setValue(registerName, value);
                          clearErrors(registerName);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={label} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {options.map((option: any, idx: number) => (
                              <SelectItem value={option} key={idx}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : registerName === "credit_card_number" ? (
                  <>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor={label}
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      maxLength={19}
                      type="text"
                      {...register(registerName)}
                      className={`${
                        isFile ? "h-20" : "h-10"
                      } border mt-1 rounded px-4 w-full bg-gray-50}`}
                      value={cardNumber}
                      onChange={handleCardInput}
                    />
                  </>
                ) : registerName === "credit_card_expiration" ? (
                  <>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor={label}
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      maxLength={5}
                      type="text"
                      {...register(registerName)}
                      className={`${
                        isFile ? "h-20" : "h-10"
                      } border mt-1 rounded px-4 w-full bg-gray-50}`}
                      value={expiryDate}
                      onChange={handleExpiryDate}
                    />
                  </>
                ) : (
                  <>
                    <label
                      className="text-gray-400 font-semibold text-sm"
                      htmlFor={label}
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={registerName === "dob_ad" ? "date" : "text"}
                      {...register(registerName)}
                      className={`${
                        isFile ? "h-20" : "h-10"
                      } border mt-1 rounded px-4 w-full bg-gray-50}`}
                    />
                  </>
                )}

                {errors[registerName] && (
                  <p className="text-red-500">{errors[registerName].message}</p>
                )}
              </div>
            )
          )}
        </form>
        {has_credit_card && (
          <div className="my-5 md:mx-6">
            <div className="text-white max-w-xs md:max-w-[600px] md:w-[350px] h-[200px] md:h-[220px] my-auto mx-auto bg-gradient-to-r from-blue-900 to-blue-500 py-5 px-4 md:px-10 rounded-xl">
              <div className="flex items-center ">
                <div className="p-5 bg-gray-200 bg-opacity-40 rounded-full"></div>
                <div className="p-5 bg-gray-200 bg-opacity-30 rounded-full -ml-4"></div>
              </div>
              <div className="mt-8 md:mt-12 flex justify-between items-center w-52">
                <span className="text-md md:text-lg">
                  {watch && watch?.credit_card_number.slice(0, 4)}
                  {" **** **** "}
                  {watch &&
                    watch?.credit_card_number.slice(
                      watch?.credit_card_number.length - 4
                    )}
                </span>
              </div>
              <div className="flex justify-between mt-5 ">
                <div>
                  <h3 className="text-xs"> Valid Thru </h3>
                  <p className="font-bold"> 10/21 </p>
                </div>
                <div>
                  <h3 className="text-xs"> Card Holder </h3>
                  <p className="font-bold">
                    {watch && watch?.credit_card_name.split(" ")[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default function BankForm() {
  const {
    has_credit_card,
    bankInformation,
    set,
    setHasCreditCard,
    banks_list,
  } = useBankFormStore();
  //console.log(bankInformation);

  const [isToggled, setIsToggled] = useState<boolean | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<hasCardBankSchemaType | noCardBankSchemaType>({
    resolver: zodResolver(
      has_credit_card ? hasCardBankSchema : noCardBankSchema
    ),
    defaultValues: {
      bank: bankInformation.bank || "",
      dob_ad: bankInformation?.dob_ad || "",
      nationality: bankInformation?.nationality || "nepali",
      credit_card_name: bankInformation.credit_card_name || "",
      credit_card_number: bankInformation?.credit_card_number
        ? bankInformation.credit_card_number.match(/\d{4}/g)?.join(" ")
        : "",
      credit_card_expiration: bankInformation.credit_card_expiration
        ? bankInformation.credit_card_expiration.match(/\d{2}/g)?.join("/")
        : "",
      credit_card_limit: bankInformation.credit_card_limit || 0,
      residential_status: bankInformation.residential_status || "",
      num_dependents: bankInformation.num_dependents || "",
      employment_length: bankInformation.employment_length || "",
      monthly_income: bankInformation.monthly_income || "",
      occupation: bankInformation.occupation || "",
      salary_certificate: bankInformation.salary_certificate
        ? [bankInformation.salary_certificate[0]]
        : [],
      citizenship_copy: bankInformation.citizenship_copy
        ? [bankInformation.citizenship_copy[0]]
        : [],
      passport_photo: bankInformation.passport_photo
        ? [bankInformation.passport_photo[0]]
        : [],
      bank_statement: bankInformation.bank_statement
        ? [bankInformation.bank_statement[0]]
        : [],
    },
  });

  const watchFields = watch();
  const nextStep = useEmiFormStore((state) => state.nextStep);
  //console.log(errors);
  const onSubmit = (data: hasCardBankSchemaType | noCardBankSchemaType) => {
    //console.log(data);
    set(data as BankInformation);
    nextStep();
  };

  const fields = has_credit_card
    ? [
        {
          id: "bank",
          label: "Bank Name",
          registerName: "bank",
          options: banks_list,
        },
        {
          id: "credit_card_name",
          label: "Credit Card Name",
          registerName: "credit_card_name",
        },
        {
          id: "credit_card_number",
          label: "Credit Card Number",
          registerName: "credit_card_number",
        },
        {
          id: "credit_card_expiry",
          label: "Credit Card Expiration",
          registerName: "credit_card_expiration",
        },
        {
          id: "credit_card_limit",
          label: "Credit Limit",
          registerName: "credit_card_limit",
        },
      ]
    : [
        {
          id: "bank",
          label: "Bank Name",
          registerName: "bank",
          colSpan: "col-span-6 md:col-span-3",
          options: banks_list,
        },

        {
          id: "residential_status",
          label: "Residential Status",
          registerName: "residential_status",
          colSpan: "col-span-6 md:col-span-4",
          options: [
            "Living with parents",
            "Rented / leased",
            "Company Quarters",
            "Own Property",
            "Other",
          ],
        },
        {
          id: "num_dependents",
          label: "No. of Dependents",
          registerName: "num_dependents",
          colSpan: "col-span-6 md:col-span-2",
          options: ["0", "1", "2", "3", "More than 3"],
        },
        {
          id: "employment_length",
          label: "Employment Length",
          registerName: "employment_length",
          colSpan: "col-span-2",
          options: [
            "Over 10 years",
            "6-10 years",
            "3-5 years",
            "Below 3 years",
          ],
        },
        {
          id: "monthly_income",
          label: "Monthly Income",
          registerName: "monthly_income",
          colSpan: "col-span-6 md:col-span-2",
        },
        {
          id: "occupation",
          label: "Occupation",
          registerName: "occupation",
          colSpan: "col-span-6 md:col-span-2",
          options: [
            "Self Employed / Business",
            "Doctor",
            "Engineer",
            "NGO / INGO Office",
            "Government Officer",
            "CA",
            "Pilot",
            "Banker",
            "Lawyer",
            "Journalist",
            "Others",
          ],
        },
        {
          id: "dob_ad",
          label: "Date of Birth",
          registerName: "dob_ad",
          colSpan: "col-span-6 md:col-span-3",
        },
        {
          id: "nationality",
          label: "Nationality",
          registerName: "nationality",
          options: ["nepali", "others"],
        },
        {
          id: "salary_certificate",
          label: "Salary Certificate",
          registerName: "salary_certificate",
          isFile: true,
          colSpan: "col-span-6 md:col-span-3",
        },
        {
          id: "citizenship_copy",
          label: "CitizenShip Copy",
          registerName: "citizenship_copy",
          isFile: true,
          colSpan: "col-span-6 md:col-span-3",
        },

        {
          id: "passport_photo",
          label: "Passport Photo",
          registerName: "passport_photo",
          isFile: true,
          colSpan: "col-span-6 md:col-span-3",
        },
        {
          id: "bank_statement",
          label: "Bank Statement",
          registerName: "bank_statement",
          isFile: true,
          colSpan: "col-span-6 md:col-span-3",
        },
      ];

  useEffect(() => {
    if (has_credit_card === null) {
      setIsToggled(null);
      return;
    }
    setIsToggled(has_credit_card);
    setValue("has_credit_card", has_credit_card);
  }, [has_credit_card]);

  return (
    <>
      <label htmlFor="has_credit_card">Do you have a credit card?</label>
      <Select
        value={isToggled?.toString()}
        defaultValue={isToggled?.toString()}
        onValueChange={(value: string) => {
          if (value === "null") {
            setIsToggled(null);
            setHasCreditCard(null);
            return;
          }
          setIsToggled(value === "true" ? true : false);
          setHasCreditCard(value === "true" ? true : false);
          setValue("has_credit_card", value === "true" ? true : false);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="null">Select</SelectItem>
          <SelectItem value="true">Yes</SelectItem>
          <SelectItem value="false">No</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex mt-4 flex-col gap-6">
        {/* <div className="flex justify-between">
          <div className="flex items-center">
            <input
              type="radio"
              name="has_credit_card"
              id="has_credit_card"
              onChange={() => {
                setHasCreditCard(true);
                setValue("has_credit_card", true);
              }}
            />
            <label htmlFor="has_credit_card" className="ml-2">
              Has Credit Card
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="has_credit_card"
              id="has_credit_card"
              onChange={() => {
                setValue("has_credit_card", false);
                setHasCreditCard(false);
              }}
            />
            <label htmlFor="has_credit_card" className="ml-2">
              Has No Credit Card
            </label>
          </div>
        </div> */}

        {has_credit_card !== null ? (
          <Form
            register={register}
            errors={errors}
            fields={fields}
            watch={watchFields}
            setValue={setValue}
            clearErrors={clearErrors}
            getValues={getValues}
          />
        ) : (
          <></>
        )}

        <StepperButtons submitForm={handleSubmit(onSubmit)} />
      </div>
    </>
  );
}
