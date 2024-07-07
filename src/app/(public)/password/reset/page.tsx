"use client";

import { PostRequest } from "@/services/httpRequest";
import { serverRequest } from "@/services/serverRequest";
import { useState } from "react";
import { toast } from "sonner";

//API/auth/users/reset_password/ POST
export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleSubmit = async (e: any, email: string) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    } else {
      const response = await PostRequest("auth/users/reset_password/", {
        email: email,
      });
      if (response.status === 204) {
        toast.success("Reset link sent to your email");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      <section className="max-w-layout py-5">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">
          Enter the Email to reset your password
        </h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e, email);
          }}
          className="flex-col-center gap-5"
        >
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white border-2 border-gray-200 rounded-[12px]"
          />
          {error ? <p className="text-red-500">{error}</p> : ""}
          <button type="submit" className="accent-button">
            Send Reset Link
          </button>
        </form>
      </section>
    </>
  );
}
