"use client";
import { toast } from "sonner";

import { removeFromCart } from "@/api/cart";
import { Trash2Icon } from "lucide-react";

export default function RemoveCartItem({ id }: { id: any }) {
  const removeCartItem = async () => {
    //console.log("removeFromCart");
    const response = await removeFromCart(id);
    if (response?.status === 200) {
      toast.success("Removed from cart");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {" "}
      <button
        onClick={removeCartItem}
        className="text-red-500 text-sm font-semibold
                            px-2 py-1 rounded-md border border-red-500 hover:bg-red-500 hover:text-white transition
                          "
      >
        <Trash2Icon size={16} />
      </button>
    </>
  );
}
