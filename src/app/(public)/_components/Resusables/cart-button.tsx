"use client";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { addToCart } from "@/api/cart";
import { toast } from "sonner";
import { showErrorToasts } from "@/lib/utils";
export default function CartButton({ productId }: { productId: number }) {
  // const cartAdd = async (id: number) => {
  //     const response = await addToCart(id);
  //     console.log(response)
  //     if (response.success === true) {
  //       toast.success(response.message);
  //     }
  //     else{
  //       showErrorToasts(response.errorData)
  //     }
  // };

  return (
    <button
      // onClick={() => cartAdd(productId)}
      className="flex w-full items-center justify-center rounded-full p-3 text-center text-sm  text-white bg-accent-2 color-transition hover:bg-accent-1 focus:outline-none group"
    >
      <HiOutlineShoppingCart className="h-4 w-4" />
    </button>
  );
}
