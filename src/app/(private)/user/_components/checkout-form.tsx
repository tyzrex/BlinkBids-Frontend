"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Flag from "public/assets/flag.png";
import { useForm } from "react-hook-form";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BiRename } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { toast } from "sonner";

import { revalidate } from "@/api/cart";
import {
  cashCheckout,
  esewaCheckout,
  khaltiCheckout,
} from "@/api/user-actions";
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
import { showErrorToasts } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  checkoutSchema,
  checkoutSchemaType,
} from "../../../../schema/user/checkout-schema";

interface CheckoutProps {
  total_price: number;
  cart_count: number;
  user?: {
    address: string;
    district: string;
    name: string;
    address_description: string;
    email: string;
    phone: string;
  };
}

export default function CheckOutForm(props: CheckoutProps) {
  console.log(props);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [district, setDistrict] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<checkoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: props?.user?.email ?? "",
      name: props?.user?.name ?? "",
      phone: props?.user?.phone ?? "",
      address: props?.user?.address ?? "",
      address_description: props?.user?.address_description ?? "",
      district: props?.user?.district ?? "",
    },
  });

  const submitForm = async (formData: checkoutSchemaType) => {
    if (formData.payment_method === "esewa") {
      //console.log("here");
      const response = await esewaCheckout(formData);
      if (response !== null) {
        // revalidate("/user/cart");
        //console.log(response);
        router.push(response?.url ? response?.url : "/user/cart");
        return;
      } else {
        //console.log(response);
      }
      return;
    }

    if (formData.payment_method === "cod") {
      const response = await cashCheckout(formData);
      if (response.success === true) {
        toast.success(response.message);
        revalidate("/user/cart");
        router.replace("/user/orders");
      } else {
        showErrorToasts(response.errorData);
      }
    }

    if (formData.payment_method === "khalti") {
      const response = await khaltiCheckout(formData);
      if (response !== null) {
        console.log(response);
        router.push(response?.url ? response?.url : "/user/cart");
        // toast.success(response.message);
        // revalidate("/user/cart");
        // router.replace("/user/orders");
      } else {
        // showErrorToasts(response.errorData);
      }
    }
  };

  useEffect(() => {
    if (district) {
      setValue("district", district);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district]);

  useEffect(() => {
    if (props.user?.district) {
      setDistrict(props.user?.district);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user?.district]);

  return (
    <>
      <form className="grid gap-6" onSubmit={handleSubmit(submitForm)}>
        <div className="px-4 mt-10 xl:mt-0">
          <h2 className="text-xl font-medium">Payment Details</h2>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email")}
                type="text"
                placeholder="test@test.com"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <AiOutlineMail className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            )}

            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="flex flex-col items-start w-full lg:w-1/2">
                <label
                  htmlFor="name"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Name
                </label>
                <div className="relative w-full">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <BiRename className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.name?.message}</p>
                )}
              </div>

              <div className="flex flex-col items-start w-full lg:w-1/2">
                <label
                  htmlFor="phone"
                  className="mt-4 mb-2 block text-sm font-medium"
                >
                  Phone Number
                </label>
                <div className="relative w-full">
                  <input
                    {...register("phone")}
                    type="text"
                    placeholder="838247324"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <AiOutlinePhone className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div>
              <div className="relative flex-shrink-0 w-full">
                <input
                  {...register("address")}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <Image
                    className="h-4 w-4 object-contain"
                    src={Flag}
                    alt=""
                    width={0}
                    height={0}
                  />
                </div>
              </div>
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
            <label
              htmlFor="billing-location-description"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address Description
            </label>
            <div>
              <div className="relative flex-shrink-0 w-full">
                <input
                  {...register("address_description")}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Address Description"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <MdOutlineDescription className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </div>
            {errors.address_description && (
              <p className="text-red-500 text-sm">
                {errors.address_description.message}
              </p>
            )}

            <div>
              <label
                htmlFor="billing-district"
                className="mt-4 mb-2 block text-sm font-medium"
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
            </div>

            {errors.district && (
              <p className="text-red-500 text-sm">{errors.district.message}</p>
            )}

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  Rs. {props.total_price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                Rs. {props.total_price.toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col gap-5 py-5">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  value="cod"
                  {...register("payment_method")}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Cash On Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Pay with cash upon delivery.
                    </p>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  value="esewa"
                  {...register("payment_method")}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_2"
                >
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Esewa</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Pay with online payment.
                    </p>
                  </div>
                </label>
              </div>

              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_3"
                  type="radio"
                  value="khalti"
                  {...register("payment_method")}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_3"
                >
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Khalti</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Pay with online payment.
                    </p>
                  </div>
                </label>
              </div>
            </div>
            {errors.payment_method && (
              <p className="text-red-500 text-sm">
                {errors.payment_method.message}
              </p>
            )}
          </div>

          {/* two different buttons inside the */}
          <button
            role="button"
            disabled={props.cart_count === 0 || isSubmitting}
            className="accent-button disabled:bg-gray-50 disabled:text-black"
            type="submit"
          >
            {isSubmitting && (
              <span
                className="animate-spin inline-block w-3 h-3 border-[3px] border-current border-t-transparent text-white rounded-full mr-2"
                role="status"
                aria-label="loading"
              ></span>
            )}
            {isSubmitting ? "Processing Order" : "Place Order"}
          </button>
        </div>
      </form>
    </>
  );
}
