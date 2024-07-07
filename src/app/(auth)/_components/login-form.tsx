"use client";

// import { loginUser } from "@/api/auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { loginSchema, LoginSchemaType } from "@/schema/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [error, setError] = useState(searchParams.get("error"));
  const router = useRouter();
  const onSubmit = async (data: LoginSchemaType) => {
    const response = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (response?.error === null) {
      toast.success("Login Success");
      router.replace("/");
    } else {
      toast.error("Invalid Credentials");
    }
  };
  return (
    <>
      <div
        className="flex-col items-center justify-center my-10 md:w-[70%] lg:w-[40%] 
        bg-white md:border md:border-gray-300 rounded-xl w-full lg:px-10 text-main-foreground px-4 md:px-6 sm:py-10 py-6
        "
      >
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <h1
            tabIndex={0}
            className="focus:outline-none text-3xl font-bold leading-6 text-gray-800"
          >
            Login to <span className="text-accent-1">BlinkedBids</span>
          </h1>
          <h2
            tabIndex={0}
            className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
          >
            Dont have account?{" "}
            <Link
              prefetch={false}
              href="/register"
              className="hover:text-accent-1 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-accent-1 cursor-pointer"
            >
              {" "}
              Sign up here
            </Link>
          </h2>

          {error && <p className="text-red-500 my-5">{error}</p>}

          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />

            <hr className="w-full bg-gray-400" />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-gray-800"
            >
              {" "}
              Email{" "}
            </label>
            <input
              {...register("email")}
              className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-500 text-gray-800 py-3 w-full pl-3 mt-2"
              placeholder="e.g: john@gmail.com "
            />
            {errors.email && (
              <p className="text-red-500">{`${errors.email.message}`}</p>
            )}
          </div>
          <div className="mt-6 w-full">
            <label
              htmlFor="myInput"
              className="text-sm font-medium leading-none text-gray-800"
            >
              {" "}
              Password{" "}
            </label>
            <div className="relative flex items-center justify-center">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="bg-gray-200 border rounded relative text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                //center it
                className="absolute right-2 top-5"
              >
                {!showPassword ? (
                  <EyeIcon className="h-4 w-4" />
                ) : (
                  <EyeOffIcon className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">{`${errors.password.message}`}</p>
            )}
          </div>
          <Link href="/password/reset" prefetch={false}>
            <span className="text-sm font-medium leading-none text-gray-800 mt-2 hover:text-accent-1 focus:text-gray-500 focus:outline-none focus:underline">
              Forgot Password?
            </span>
          </Link>
          <div className="mt-8">
            <button
              role="button"
              disabled={isSubmitting}
              className="login-button w-full flex-center"
              type="submit"
            >
              {isSubmitting && (
                <span
                  className="animate-spin inline-block w-3 h-3 border-[3px] border-current border-t-transparent text-white rounded-full mr-2"
                  role="status"
                  aria-label="loading"
                ></span>
              )}
              {isSubmitting ? "Checking Credentials" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
