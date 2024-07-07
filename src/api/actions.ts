"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { PatchRequest, PostRequest } from "@/services/httpRequest";
import {
  requestHandler,
  serverProtectedRequest,
} from "@/services/serverRequest";

import { initSession } from "./cart";
import { returnError } from "./cms";
import {
  handleSuccessResponse,
  type SuccessResponse,
  type ErrorResponse,
  handleErrorResponse,
  handleCustomErrorResponse,
} from "@/lib/response-handler";

const handleServerAction = async <ResponseType, RequestType>(
  endpoint: string,
  method: "POST" | "PATCH" | "DELETE" | "PUT" | "GET",
  successMessage: string,
  revalidateUrl: string | null,
  data?: RequestType
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    if (!session) {
      return handleCustomErrorResponse(401, "Session Expired");
    }
    const res = await requestHandler<ResponseType, RequestType>(
      endpoint,
      method,
      session,
      data
    );
    if (revalidateUrl) {
      revalidatePath(revalidateUrl);
    }
    return handleSuccessResponse(res, successMessage);
  } catch (err: any) {
    console.error(err);
    return handleErrorResponse(err);
  }
};

export const updateOrderStatus = async (id: number, status: string) => {
  return handleServerAction(
    `cms/orders/toggle-order-status/`,
    "PATCH",
    "Order Updated Successfully",
    null,
    {
      order_id: id,
      status: status,
    }
  );
};

export const updateEMIStatus = async (id: number, status: string) => {
  try {
    const session = await initSession();
    const res = await requestHandler(
      `cms/emi/info/?id=${id}`,
      "PATCH",
      session,
      {
        status: status,
      },
      ["emi-status-update"]
    );
    if (res?.status === 200) {
      // revalidatePath(`/admin/emi-requests`)
      revalidateTag("emi-status-update");
    }
    return handleSuccessResponse(res, "EMI status updated successfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const getOrderDetail = async (id: number) => {
  try {
    const session = await initSession();
    const res = await serverProtectedRequest(
      `cms/orders/info?id=${id}`,
      "GET",
      session
    );

    return res?.data;
  } catch (err) {
    return {
      err: err,
    };
  }
};

export const getProductAttributes = async (category: string) => {
  try {
    const session = await initSession();
    const res = await serverProtectedRequest(
      `cms/products/attribute/list`,
      "POST",
      session,
      {
        category: category,
      }
    );
    //console.log(res?.data)
    return {
      data: res?.data,
    };
  } catch (err: any) {
    return returnError(err);
  }
};

export const addNewBrand = async (data: any) => {
  return handleServerAction(
    `cms/products/brand/create/`,
    "POST",
    "Brand added successfully",
    `/admin/brands`,
    data
  );
};

export const editExistingBrand = async (id: number, data: any) => {
  return handleServerAction(
    `cms/products/brand/edit/${id}`,
    "PATCH",
    "Brand updated successfully",
    `/admin/brands`,
    data
  );
};

export const deleteExistingBrand = async (id: number) => {
  try {
    const session = await initSession();
    const res = await serverProtectedRequest(
      `cms/products/brand/delete/${id}`,
      "DELETE",
      session
    );
    revalidatePath(`/admin/brands`);
    //console.log(res)
    return handleSuccessResponse(res, "Brand deleted Successfully");
  } catch (err: any) {
    return handleErrorResponse(err);
  }
};

export const deleteExistingBank = async (id: number) => {
  try {
    const session = await initSession();
    const res = await requestHandler(
      `cms/emi/bank/info?id=${id}`,
      "DELETE",
      session
    );
    revalidatePath(`/admin/banks`);
    return handleSuccessResponse(res, "Bank deleted Successfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const addNewCategory = async (
  data: any,
  submitType: string,
  id?: number
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    const httpMethod = submitType === "edit" ? "PATCH" : "POST";
    const url =
      submitType === "edit"
        ? `cms/category/edit/${id}/`
        : "cms/category/create/";
    const response = await requestHandler(url, httpMethod, session, data);
    return handleSuccessResponse(
      response,
      submitType === "edit"
        ? "Category updated successfully"
        : "Category added successfully"
    );
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const removeCategory = async (
  id: number,
  type: "parent" | "child"
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    const response = await requestHandler(
      `cms/category/delete/${id}`,
      "DELETE",
      session
    );
    revalidatePath(
      type === "parent" ? `/admin/category` : `/admin/category-children`
    );
    return handleSuccessResponse(response, "Category Deleted Succesfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const addNewCategoryType = async (
  data: any,
  submitType: string,
  id?: number
) => {
  const session = await initSession();
  const httpMethod = submitType === "edit" ? "PATCH" : "POST";
  const url =
    submitType === "edit"
      ? `cms/category/types/info/?id=${id}`
      : "cms/category/types/create/";
  const response = await requestHandler(url, httpMethod, session, data);
  revalidatePath(`/admin/category-type`);
  return response.status;
};

export const addNewBank = async (
  data: any,
  submitType: string,
  id?: number
) => {
  try {
    const session = await initSession();
    const httpMethod = submitType === "edit" ? "PATCH" : "POST";
    const url =
      submitType === "edit"
        ? `cms/emi/bank/info/?id=${id}`
        : "cms/emi/bank/create";
    const response = await requestHandler(url, httpMethod, session, data);
    revalidatePath(`/admin/banks`);
    return handleSuccessResponse(response, "Bank created Successfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const deleteCategoryType = async (id: number) => {
  const session = await initSession();
  const url = `cms/category/types/info/?id=${id}`;
  const response = await requestHandler(url, "DELETE", session);
  revalidatePath(`/admin/category-type`);
  return response.status;
};

export const addNewProduct = async (
  data: any
): Promise<SuccessResponse | ErrorResponse> => {
  return handleServerAction(
    `cms/products/create/`,
    "POST",
    "Product added successfully",
    `/admin/products`,
    data
  );
};

export const removeProduct = async (
  id: number
): Promise<SuccessResponse | ErrorResponse> => {
  return handleServerAction(
    `cms/products/delete/`,
    "POST",
    "Product deleted successfully (soft)",
    `/admin/products`,
    {
      product_id: id,
    }
  );
};

export const hardDeleteProduct = (id: number) => {
  return handleServerAction(
    `cms/products/delete/hard/${id}`,
    "DELETE",
    "Product deleted successfully (no restore)",
    `/admin/deleted-products`
  );
};

export const restoreProduct = async (id: number) => {
  return handleServerAction(
    `cms/products/restore/`,
    "POST",
    "Product restored successfully",
    `/admin/products`,
    {
      product_id: id,
    }
  );
};

export const duplicateProduct = async (id: number) => {
  return handleServerAction(
    `cms/products/duplicate/`,
    "POST",
    "Product duplicated successfully",
    `/admin/products`,
    {
      product_id: id,
    }
  );
};

export const handleMediaUpload = (data: FormData) => {
  return handleServerAction(
    `cms/media-library/add/`,
    "POST",
    "Product deleted successfully (no restore)",
    `/admin/deleted-products`,
    data
  );
};

export const editProduct = async (data: any) => {
  try {
    const session = await initSession();
    const res = await requestHandler(
      `cms/products/edit/`,
      "PATCH",
      session,
      data
    );
    revalidatePath(`/admin/products`);

    return handleSuccessResponse(res, "Product edited successfully");
  } catch (err: any) {
    console.log(err);
    return handleErrorResponse(err);
  }
};

//banner actions

export const createNewHeroBanner = async (data: any) => {
  try {
    const session = await initSession();
    const res = await PostRequest(`cms/banner1/create/`, data, {
      headers: {
        Authorization: `Bearer ${session?.user?.access}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      data: res?.data,
      status: res?.status,
    };
  } catch (err: any) {
    return returnError(err);
  }
};

//blogs

export const addBlogCategory = async (
  data: any
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    const response = await requestHandler(
      `cms/blog/category/create/`,
      "POST",
      session,
      data
    );
    revalidatePath(`/admin/blog-categories`);
    return handleSuccessResponse(
      response,
      "Blog category created successfully"
    );
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const editBlogCategory = async (
  data: any,
  id: number
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    const response = await requestHandler(
      `cms/blog/category/edit/${id}`,
      "PUT",
      session,
      data
    );
    revalidatePath(`/admin/blog-categories`);
    return handleSuccessResponse(response, "Blog category edited successfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const deleteBlogCategory = async (
  id: number
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    const response = await requestHandler(
      `cms/blog/category/delete/${id}`,
      "DELETE",
      session
    );
    revalidatePath(`/admin/blog-categories`);
    return handleSuccessResponse(response, "Blog category edited successfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const addNewBlog = async (data: any) => {
  try {
    const session = await initSession();
    const response = await requestHandler(
      `cms/blog/create/`,
      "POST",
      session,
      data
    );
    revalidatePath(`/admin/blog`);
    return handleSuccessResponse(response, "Blog added successfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};

export const editBlog = async (data: any, id: number) => {
  try {
    const session = await initSession();
    const response = await requestHandler(
      `cms/blog/edit/${id}`,
      "PUT",
      session,
      data
    );
    revalidatePath(`/admin/blog`);
    return handleSuccessResponse(response, "Blog edited successfully");
  } catch (err) {
    return handleErrorResponse(err);
  }
};
// export const addOfferBanner = fetchHandler<FormData, any>(async (params) => {
//     return ServerRequestWithFile(`cms/banner2/create/`, "POST", params, )
// }
// )

export const addOfferBanner = async (params: FormData) => {
  try {
    const session = await initSession();
    const response = await requestHandler(
      `cms/banner/add/`,
      "POST",
      session,
      params
    );

    revalidatePath(`/admin/banners`);
    return response?.status;
  } catch (err: any) {
    console.log(err);
    return returnError(err);
  }
};

export const addHeroBanners = async (params: FormData) => {
  try {
    const session = await initSession();
    const response = await requestHandler(
      `cms/banner/add/`,
      "POST",
      session,
      params
    );

    revalidatePath(`/admin/banners`);
    return handleSuccessResponse(response, "Banner Added Successfully");
  } catch (err: any) {
    return handleErrorResponse(err);
  }
};

export const deleteBanners = async (name: string, type: string) => {
  try {
    const session = await initSession();
    const response = await requestHandler(
      `cms/banner/delete/`,
      "PATCH",
      session,
      {
        image_name: name,
        banner_type: type,
      }
    );
    revalidatePath(`/admin/banners/*`);
    return response?.status;
  } catch (err) {
    return returnError(err);
  }
};

export const addNewCampaign = async (
  params: FormData
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    const response = await requestHandler(
      `cms/campaign/create/`,
      "POST",
      session,
      params
    );
    revalidatePath(`/admin/campaigns`);
    return handleSuccessResponse(response, "Campaign added successfully");
  } catch (err: any) {
    return handleErrorResponse(err);
  }
};

export const deleteExistingCampaign = async (id: number) => {
  return handleServerAction(
    `cms/campaign/delete/${id}`,
    "DELETE",
    "Campaign deleted successfully",
    `/admin/campaigns`
  );
};

export const editUserRoles = async (
  data: any
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    const res = await requestHandler(
      `cms/user/manage/`,
      "PATCH",
      session,
      data
    );
    revalidatePath(`/admin/users/roles`);
    return handleSuccessResponse(res, "User Role Updated Successfully");
  } catch (err: any) {
    return handleErrorResponse(err);
  }
};

//pages

export const addNewPageData = async (
  data: any
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    const res = await requestHandler(`cms/page/create/`, "POST", session, data);
    revalidatePath(`/admin/pages`);
    return handleSuccessResponse(res, "New Page Data added Successfully");
  } catch (err: any) {
    return handleErrorResponse(err);
  }
};

export const editPageData = async (
  data: any,
  id: number
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    const res = await requestHandler(
      `cms/page/edit/${id}`,
      "PATCH",
      session,
      data
    );
    revalidatePath(`/admin/pages`);
    return handleSuccessResponse(res, "Page Data edited Successfully");
  } catch (err: any) {
    return handleErrorResponse(err);
  }
};

export const deletePageData = async (
  id: number
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const session = await initSession();
    const res = await requestHandler(
      `cms/page/delete/${id}`,
      "DELETE",
      session
    );
    revalidatePath(`/admin/pages`);
    return handleSuccessResponse(res, "Page Data deleted Successfully");
  } catch (err: any) {
    return handleErrorResponse(err);
  }
};
