import { Session } from "next-auth";

import { serverProtectedRequest } from "@/services/serverRequest";

import { returnError } from "./cms";

export async function getUserInfo(session: Session | null) {
  try {
    const response = await serverProtectedRequest(
      `user/delivery/info`,
      "GET",
      session
    );
    return response?.data;
  } catch (err) {
    return { err: returnError(err) };
  }
}

export async function getUserOrders(
  session: Session | null,
  current_page: number
) {
  try {
    const response = await serverProtectedRequest(
      `carts/user/orders/`,
      "GET",
      session
    );
    return response?.data;
  } catch (err) {
    return { err: returnError(err) };
  }
}
