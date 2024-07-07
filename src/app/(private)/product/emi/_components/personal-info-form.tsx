"use client";

import { useForm } from "react-hook-form";

import InputField from "@/app/(private)/admin/components/Input";
import { useEmiFormStore, usePersonalInformationStore } from "@/store/emiform";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  userSchema,
  type userSchemaType,
} from "../../../../../schema/emi/personal-info-schema";
import StepperButtons from "./emi-stepper-buttons";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { nepalDistricts } from "@/lib/constants";

export default function PersonalhtmlForm() {
  const personalStore = usePersonalInformationStore();
  const { nextStep } = useEmiFormStore();
  const [district, setDistrict] = useState<string>("");
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<userSchemaType>({
    defaultValues: {
      full_name: personalStore
        ? personalStore.personalInformation.full_name
        : "",
      email: personalStore ? personalStore.personalInformation.email : "",
      address: personalStore ? personalStore.personalInformation.address : "",
      contact_number: personalStore
        ? personalStore.personalInformation.contact_number
        : "",
    },
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: userSchemaType) => {
    //console.log(data);
    personalStore.setPersonalInformation(data);
    nextStep();
  };

  useEffect(() => {
    if (district) {
      setValue("district", district);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district]);

  useEffect(() => {
    if (personalStore.personalInformation.district) {
      setDistrict(personalStore.personalInformation.district);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personalStore.personalInformation.district]);

  return (
    <>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 text-sm grid-cols-1 md:grid-cols-6"
      >
        <div className="col-span-6">
          <InputField
            errors={errors.full_name?.message}
            field={register("full_name")}
            label="Full Name"
            placeholder="Full Name"
            type="text"
            key="full_name"
          />
        </div>

        <div className="col-span-6 md:col-span-3">
          <InputField
            errors={errors.email?.message}
            field={register("email")}
            label="Email"
            placeholder="Email"
            type="email"
            key="email"
          />
        </div>

        <div className="col-span-6 md:col-span-3">
          <InputField
            errors={errors.address?.message}
            field={register("address")}
            label="Street Address"
            placeholder="Address"
            type="text"
            key="address"
          />
        </div>

        <div className="col-span-6">
          <InputField
            errors={errors.contact_number?.message}
            field={register("contact_number")}
            label="Contact Number"
            placeholder="enter your number"
            type="text"
            key="contact_number"
          />
        </div>

        <div className="col-span-6 md:col-span-3">
          <label htmlFor="zipcode">Gender</label>
          <select
            {...register("gender")}
            id="gender"
            className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div className="col-span-6 md:col-span-3">
          <label
            htmlFor="billing-district"
            className="text-gray-400 block text-sm font-bold"
          >
            Billing District
          </label>
          <div className="w-full">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="w-full">
                <input
                  {...register("district")}
                  type="text"
                  placeholder="District"
                  value={district}
                  autoComplete="off"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 "
                />
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 mt-2 h-[200px]">
                <Command>
                  <CommandInput
                    placeholder="Search District..."
                    className="h-9  px-10"
                  />
                  <CommandEmpty>No District found.</CommandEmpty>
                  <CommandGroup className="overflow-y-scroll">
                    {nepalDistricts.map((district) => (
                      <CommandItem
                        key={district}
                        onSelect={(currentValue: any) => {
                          setDistrict(district);
                          setOpen(false);
                        }}
                      >
                        {district}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district.message}</p>
          )}
        </div>

        <StepperButtons submitForm={handleSubmit(onSubmit)} />
      </form>
    </>
  );
}
