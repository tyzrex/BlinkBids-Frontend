"use server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "@/lib/response-handler";
import {
  requestHandler,
  serverProtectedRequest,
} from "@/services/serverRequest";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
export const initSession = async () => {
  const session = await getServerSession(options);
  return session;
};

export const addToCart = async (productId: number, itemQuantity?: number) => {
  try {
    const session = await initSession();
    if (!session) {
      return handleErrorResponse({
        success: false,
        status: 401,
        errorData: "You need to login to access the cart feature",
      });
    }

    const res = await requestHandler("carts/add/", "PATCH", session, {
      product_id: productId,
    });
    revalidatePath("user/cart");
    return handleSuccessResponse(res, "Added to cart successfully");
  } catch (err) {
    console.log(err);
    return handleErrorResponse(err);
  }
};

export const removeFromCart = async (productId: number) => {
  const session = await initSession();
  const url = `orders/cart/remove/?product=${productId}`;
  const res = await serverProtectedRequest(url, "POST", session);
  revalidatePath("/user/cart");
  return res;
};

export const revalidate = async (path: string) => {
  revalidatePath(path);
};

export const modifyCartItemsQuantity = async (
  productId: number,
  quantity: number,
  cartId: number
) => {
  try {
    const session = await initSession();
    const url = `orders/cart/update`;
    console.log(productId, quantity);
    const res = await serverProtectedRequest(url, "PATCH", session, {
      product_id: productId,
      quantity: quantity,
    });
    revalidatePath("/user/cart");
    return handleSuccessResponse(res, "Cart quantity updated successful");
  } catch (err) {
    return handleErrorResponse(err);
  }
};
