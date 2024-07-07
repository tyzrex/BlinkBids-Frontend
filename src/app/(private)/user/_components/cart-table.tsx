"use client";
import Image from "next/image";
import Link from "next/link";
import EmptyCart from "public/emptycart.png";

import ProductQuantity from "./product-quantity";
import RemoveCartItem from "./remove-cart-item";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { cashCheckout, esewaCheckout } from "@/api/user-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { showErrorToasts } from "@/lib/utils";
import { revalidate } from "@/api/cart";

const checkoutSchema = z.object({
  payment_method: z.enum(["cod", "esewa", "khalti"]),
});

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;

export default function Table(props: any) {
  const [checkoutMethod, setCheckoutMethod] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<checkoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
  });

  if (props?.cartItems?.length === 0 || !props.cartItems) {
    return (
      <div className="flex flex-col mt-10 justify-center items-center w-full h-[50vh]">
        <h1 className="text-2xl font-semibold">No Items in Cart</h1>
        <Image
          src={EmptyCart}
          alt="Empty Cart"
          className="w-[400px] h-[350px]"
          width={0}
          height={0}
        />
        <p className="text-gray-500 mt-5">
          Your cart is empty. Add items to it now.
        </p>
      </div>
    );
  }

  const router = useRouter();

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
      const response = await cashCheckout();
      if (response.success === true) {
        toast.success(response.message);
        revalidate("/user/cart");
        router.replace("/user/orders");
      } else {
        showErrorToasts(response.errorData);
      }
    }
  };
  return (
    <>
      <section className="my-10 relative w-full rounded-2xl ">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-white border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="title-typography">Cart</p>
              <p className="text-sm md:text-xl text-gray-400">
                {props.cartItems?.count} Items
              </p>
            </div>
            <div>
              <button className="login-button px-4 rounded-full">
                <Link href="/">Add More</Link>
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white shadow">
            <div className="flex flex-col xl:flex-row">
              <div id="summary" className="w-full px-10 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">
                  Cart Summary
                </h1>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Number of items{" "}
                  </span>
                  <span className="font-semibold text-accent-2 text-sm">
                    {props.cartItems?.count}
                  </span>
                </div>

                {
                  //all items small summary
                  <div className="border-t mt-8">
                    {props.cartItems.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex font-semibold justify-between py-4 text-sm uppercase items-center"
                      >
                        <span>{item.product}</span>
                        <span>Rs {item?.price}</span>

                        <span>
                          <ProductQuantity
                            quantity={item.quantity}
                            id={item.product.id}
                            cart_id={props.cartItems.id}
                          />
                        </span>

                        <div className="hidden md:flex justify-end mt-4 md:mt-0">
                          <RemoveCartItem id={item.product.id} />
                        </div>
                      </div>
                    ))}
                  </div>
                }

                <div className="border-t mt-4">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>
                      {props.cartItems
                        ?.map((item: any) => {
                          return item.price * item.quantity;
                        })
                        .reduce((a: number, b: number) => a + b, 0)}
                    </span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="accent-button rounded-full">
                        Proceed to Checkout
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <form onSubmit={handleSubmit(submitForm)}>
                        <DialogHeader>
                          <DialogTitle>Select payment method</DialogTitle>
                          <DialogDescription>
                            Choose the payment method that you would like to use
                            to complete the purchase.
                          </DialogDescription>
                        </DialogHeader>
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
                                <span className="mt-2 font-semibold">
                                  Cash On Delivery
                                </span>
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
                                <span className="mt-2 font-semibold">
                                  Esewa
                                </span>
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
                        <DialogFooter>
                          <button
                            className="accent-button rounded-full"
                            disabled={isSubmitting}
                            type="submit"
                          >
                            Proceed to Checkout
                          </button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
