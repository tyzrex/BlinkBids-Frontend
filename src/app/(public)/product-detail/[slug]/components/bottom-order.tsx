"use client";

import { addToCart } from "@/api/cart";
import { showErrorToasts } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OrderButtons(props: {
  id: any;
  slug: string;
  emi_available: boolean;
}) {
  const session = useSession();
  const router = useRouter();
  const applyEmiHandler = () => {
    if (session.status !== "authenticated") {
      toast.error("Please login to apply for EMI");
      return;
    } else {
      router.push(`/product/emi/${props.slug}`);
    }
  };

  const cartAdd = async (id: number) => {
    try {
      const response = await addToCart(id, 1);
      if (response.success === true) {
        toast.success(response.message);
      } else {
        showErrorToasts(response.errorData);
      }
    } catch (error) {
      //console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="fixed bottom-0 flex xs:flex-row flex-col items-center w-full gap-2 bg-white py-4 md:hidden max-w-layout">
        <button
          onClick={() => {
            cartAdd(props.id);
          }}
          className="accent-button w-full"
        >
          Add to Cart
        </button>

        {/* <button className="bg-emerald-500 py-3 px-5 rounded-md text-white text-sm w-full">
          Buy Now
        </button> */}
      </div>
    </>
  );
}
