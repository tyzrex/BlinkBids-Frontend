import { Suspense } from "react";

import { getServerSession, Session } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { requestHandler } from "@/services/serverRequest";

import CartTable from "../_components/cart-table";

const getCartItems = async (session: Session | null) => {
  try {
    const response = await requestHandler("carts/detail", "GET", session);
    return response?.data;
  } catch (error) {
    //console.log(error);
  }
};

async function CartItems() {
  const session = await getServerSession(options);
  const cartItems: any = await getCartItems(session);

  console.log(cartItems);

  return (
    <>
      <CartTable cartItems={cartItems} />
    </>
  );
}

export default async function CartPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex-center">
          <span className="loader"></span>
        </div>
      }
    >
      <CartItems />
    </Suspense>
  );
}
