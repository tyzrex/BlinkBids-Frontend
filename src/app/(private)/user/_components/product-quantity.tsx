"use client";

import { modifyCartItemsQuantity } from "@/api/cart";
import { showErrorToasts } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProductQuantity {
  quantity: number;
  id: number;
  cart_id: number;
}

export default function ProductQuantity({
  quantity,
  id,
  cart_id,
}: IProductQuantity) {
  const [productQuantity, setProductQuantity] = useState<number>(quantity);

  // const handleQuantity = async (procedure: string) => {
  //   if (procedure === "add") {
  //     console.log(productQuantity);
  //     if (productQuantity >= 10) {
  //       toast.error("Quantity cannot be more than 10");
  //       return;
  //     }
  //     // setProductQuantity((prev = prev + 1));
  //     setProductQuantity(productQuantity + 1);
  //     console.log(productQuantity);
  //     await handleCartUpdate(quantity + 1);
  //   } else {
  //     if (productQuantity <= 1) {
  //       toast.error("Quantity cannot be less than 1");
  //       return;
  //     }
  //     setProductQuantity(productQuantity - 1);
  //     await handleCartUpdate(quantity - 1);
  //   }
  // };

  const handleCartUpdate = async (quantity: number) => {
    try {
      console.log(quantity);
      const response = await modifyCartItemsQuantity(id, quantity, cart_id);
      if (response.success === true) {
        toast.success(response.message);
      } else {
        showErrorToasts(response.errorData);
      }
    } catch (err: unknown) {
      toast.error("Error updating the cart");
    }
  };

  useEffect(() => {
    setProductQuantity(quantity);
  }, [quantity]);

  return (
    <>
      <div className="flex h-8 items-stretch text-gray-600">
        <Select
          onValueChange={(value) => {
            setProductQuantity(parseInt(value));
            handleCartUpdate(parseInt(value));
          }}
        >
          <SelectTrigger className="w-[60px]">
            <SelectValue placeholder={productQuantity.toString()} />
          </SelectTrigger>
          <SelectContent>
            {/* select content for number of items  */}
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
          </SelectContent>
        </Select>
        {/* <button
          onClick={() => handleQuantity("subtract")}
          className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-accent-2 hover:text-white"
        >
          -
        </button>
        <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
          {productQuantity}
        </div>
        <button
          onClick={() => handleQuantity("add")}
          className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-accent-2 hover:text-white"
        >
          +
        </button> */}
      </div>
    </>
  );
}
