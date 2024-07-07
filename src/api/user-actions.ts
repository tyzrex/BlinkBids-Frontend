"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import {
  handleCustomErrorResponse,
  handleErrorResponse,
  handleSuccessResponse,
} from "@/lib/response-handler";
import {
  requestHandler,
  serverProtectedRequest,
} from "@/services/serverRequest";

import { initSession, revalidate } from "./cart";
import { returnError } from "./cms";
import { redirect } from "next/navigation";

export const esewaCheckout = async (data: any) => {
  const session = await initSession();
  try {
    const res = await serverProtectedRequest(
      `pay/esewa/`,
      "POST",
      session,
      data
    );
    //console.log(res?.data)

    if (res?.data) {
      const orderFormData = new FormData();
      Object.keys(res?.data).forEach((key) => {
        orderFormData.append(key, res?.data[key].toString());
      });

      const esewaApiResponse = await fetch(`${process.env.ESEWA_API_URL}`, {
        method: "POST",
        body: orderFormData,
        cache: "no-cache",
      });
      return {
        url: esewaApiResponse.url,
      };
    }
  } catch (err) {
    return {
      error: returnError(err),
    };
  }
};

export const cashCheckout = async () => {
  const session = await initSession();
  try {
    const res = await requestHandler(`carts/checkout/`, "POST", session);
    revalidate("/user/cart");
    return handleSuccessResponse(res, "Order placed successfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const updateUserInfo = async (data: any) => {
  const session = await initSession();
  try {
    if (!session) {
      return handleCustomErrorResponse(
        401,
        "You need to login to update your profile."
      );
    }
    const res = await serverProtectedRequest(
      `user/update/`,
      "POST",
      session,
      data
    );
    if (res?.status === 200) {
      revalidate("/user/profile");
    }

    return res?.status;
  } catch (err) {
    return {
      error: returnError(err),
    };
  }
};

export const applyEMI = async (data: any) => {
  const session = await initSession();

  try {
    const response = await requestHandler(`emi/create/`, "POST", session, data);
    return handleSuccessResponse(response, "EMI applied successfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const postProductReview = async (data: any) => {
  const session = await initSession();
  if (!session) {
    return handleCustomErrorResponse(
      401,
      "You need to login to post a review."
    );
  }
  try {
    const res = await requestHandler(`review/create/`, "POST", session, data);
    revalidatePath("/product-detail");
    return handleSuccessResponse(res, "Review submitted successfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const registerUser = async (data: any) => {
  try {
    const response = await requestHandler(
      "accounts/auth/users/",
      "POST",
      null,
      data
    );
    return handleSuccessResponse(response, "Registration Successful");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const serverLogout = async () => {
  try {
    cookies().delete("next-auth.session-token");
    redirect("/login");
  } catch (err) {
    return handleErrorResponse(err);
  }
};
