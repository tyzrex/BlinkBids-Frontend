import { Session } from "next-auth";

import { makeKeyCleaner } from "@/lib/utils";

export async function serverRequest(url: string, method: string, body?: any) {
  try {
    const response = await fetch(`${process.env.API_URL}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      // cache: "no-store",
    });
    if (response.ok) {
      if (response.status === 204) {
        return {
          success: true,
        };
      }
      try {
        var data = await response.json();
      } catch (err) {
        data = {};
      }
      return {
        success: true,
        data: data,
        status: response.status,
      };
    } else {
      // Handle non-2xx HTTP status codes here
      ErrorHandler(response);
    }
  } catch (error) {
    //console.log(error)
    // Handle any unexpected errors
    ErrorHandler(error);
  }
}

type DefaultRequestBody = Record<string, unknown> | FormData;

export type RequestBody<T = DefaultRequestBody> = T;

type requestBody = Record<string, unknown> | FormData;

export async function serverProtectedRequest(
  url: string,
  method: string,
  session: Session | null,
  body?: requestBody
) {
  try {
    const headers = new Headers();
    if (body?.constructor == Object) {
      headers.append("Content-Type", "application/json");
    }

    if (session) {
      headers.append("Authorization", `Bearer ${session.user?.access}`);
    }

    const response = await fetch(`${process.env.API_URL}${url}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      // cache: "no-cache",
    });
    //console.log(response)

    // Handle the HTTP response based on status codes
    if (response.ok) {
      if (response.status === 204) {
        return {
          success: true,
        };
      }
      try {
        var data = await response.json();
      } catch (err) {
        data = {};
      }
      return {
        success: true,
        data: data,
        status: response.status,
      };
    } else {
      // Handle non-2xx HTTP status codes here
      // ErrorHandler(response)
      throw response;
    }
  } catch (error) {
    //console.log(error)
    // Handle any unexpected errors
    ErrorHandler(error);
  }
}
class AppError extends Error {
  status: number;
  errorData: object;
  constructor(message: string, status: number, errorData: any) {
    super(message);
    this.status = status;
    this.errorData = errorData;
  }
}
export async function ErrorHandler(response: any) {
  switch (response.status) {
    case 400:
      throw new AppError(
        response.detail || "Bad request",
        response.status,
        response.data
      );
    case 401:
      throw new AppError(
        response.detail || "You are not authorized to perform this action",
        response.status,
        response.data
      );
    case 403:
      throw new AppError(
        response.detail || "You are not authorized to perform this action",
        response.status,
        response.data
      );
    case 409:
      throw new AppError(
        response.detail || "Entity already exists",
        response.status,
        response.data
      );
    case 404:
      throw new AppError(
        response.detail || "Resource not found",
        response.status,
        response.data
      );
    default:
      throw new Error("Something went wrong");
  }
}

export async function requestHandler<
  TResponse = unknown,
  TRequestBody = DefaultRequestBody
>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  session: Session | null,
  body?: RequestBody<TRequestBody>,
  tags?: string[],
  errorHandler: (error: Error) => void = ErrorHandler
): Promise<{ success: boolean; data?: TResponse; status?: number }> {
  try {
    const headers = new Headers();
    if (body && !(body instanceof FormData)) {
      headers.append("Content-Type", "application/json");
    }

    if (session?.user?.access) {
      headers.append("Authorization", `Bearer ${session.user.access}`);
    }

    const apiUrl = process.env.API_URL || "http://localhost:8000/api/";
    const response = await fetch(`${apiUrl}${url}`, {
      method: method,
      headers: headers,
      body: body instanceof FormData ? body : JSON.stringify(body),
      // cache: "no-store",
      next: {
        revalidate: 60,
        tags: tags,
      },
    });

    if (response.ok) {
      if (response.status === 204) {
        return { success: true, status: response.status };
      }
      let data: TResponse | {} = {};
      try {
        data = await response.json();
      } catch (err) {
        data = {};
      }
      return {
        success: true,
        data: data as TResponse,
        status: response.status,
      };
    } else {
      let data: any;
      try {
        data = await response.json();
      } catch (err) {
        // console.error(err);
        throw new AppError(
          response.statusText || "Something went wrong",
          response.status,
          response.statusText
        );
      }

      // Construct error message
      let errorMessage = formatErrorMessage(data);

      throw new AppError(response.statusText, response.status, errorMessage);
    }
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      console.error(error);
      errorHandler(error instanceof Error ? error : new Error(String(error)));
    }
  }
  // This return statement is unlikely to be reached
  return { success: false };
}

// Adjusted error message formatter to fit TypeScript
function formatErrorMessage(data: any): string {
  let errorMessage = "";

  if (data && typeof data === "object") {
    errorMessage = Object.entries(data)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${makeKeyCleaner(key)}: ${value}`;
        } else if (value && typeof value === "object") {
          return `${makeKeyCleaner(key)}: ${formatErrorMessage(value)}`;
        }
        return "";
      })
      .filter((message) => message)
      .join("| ");
  } else {
    errorMessage = "Something went wrong";
  }

  return errorMessage;
}
