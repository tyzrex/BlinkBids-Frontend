"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { registerUser } from "@/api/user-actions";
import { showErrorToasts } from "@/lib/utils";
import { registerSchema, RegisterSchemaType } from "@/schema/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);

  const onSubmit = async (data: RegisterSchemaType) => {
    const response = await registerUser(data);
    if (response?.success === true) {
      router.replace("/login");
      toast.success("Account created succesfully");
    } else {
      //console.log(response.data);
      showErrorToasts(response.errorData);
    }
  };
  return (
    <>
      <div
        className="flex-col items-center justify-center sm:my-10 md:w-full lg:min-w-[800px]
        bg-white md:border md:border-gray-300 rounded-xl w-full lg:px-10 text-main-foreground px-4 md:px-6 sm:py-10 py-6"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="flex items-center justify-center "
        >
          <div className="w-full py-6">
            <h1
              tabIndex={0}
              className="focus:outline-none text-3xl font-bold leading-6 text-gray-800"
            >
              Register to<span className="text-accent-1"> Blinked</span>
              <span className="text-accent-1">Bids</span>
            </h1>

            <h2
              tabIndex={0}
              className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
            >
              Already Have an Account ?{" "}
              <Link
                prefetch={false}
                href="/login"
                className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-accent-2 cursor-pointer"
              >
                {" "}
                Login here
              </Link>
            </h2>

            <div className="w-full flex items-center justify-between py-5">
              <hr className="w-full bg-gray-400" />
              <p className="text-base font-medium leading-4 px-2.5 text-gray-500">
                OR
              </p>
              <hr className="w-full bg-gray-400" />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                First Name{" "}
              </label>
              <input
                {...register("first_name")}
                className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                placeholder="e.g: Blinked Bids "
              />
              {errors.first_name && (
                <p className="text-red-500">{`${errors.first_name.message}`}</p>
              )}
            </div>
            <div className="mt-6">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                Last Name{" "}
              </label>
              <input
                {...register("last_name")}
                className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                placeholder="e.g: Blinked Bids "
              />
              {errors.last_name && (
                <p className="text-red-500">{`${errors.last_name.message}`}</p>
              )}
            </div>
            <div className="mt-6 w-full">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                Email{" "}
              </label>
              <input
                {...register("email")}
                className="bg-gray-200 border rounded text-xs font-medium leading-none placeholder-gray-800 text-gray-800 py-3 w-full pl-3 mt-2"
                placeholder="e.g: blinkedbids@bb.com "
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
            <div className="mt-6 w-full">
              <label
                htmlFor="myInput"
                className="text-sm font-medium leading-none text-gray-800"
              >
                {" "}
                Confirm Password{" "}
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  {...register("re_password")}
                  type={showRePassword ? "text" : "password"}
                  placeholder="********"
                  className="bg-gray-200 border rounded relative text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  //center it
                  className="absolute right-2 top-5"
                >
                  {!showRePassword ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeOffIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.re_password && (
                <p className="text-red-500">{`${errors.re_password.message}`}</p>
              )}
            </div>

            <div className="mt-6 w-full flex gap-2">
              <Checkbox
                id="terms1"
                {...register("confirm")}
                onCheckedChange={(value) => {
                  setValue("confirm", value ? true : false);
                  clearErrors("confirm");
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Agree to terms and conditions
                </label>

                {errors?.confirm?.message && (
                  <p className="text-red-500">{errors?.confirm?.message}</p>
                )}
              </div>
            </div>
            <div className="mt-8">
              <button
                role="button"
                disabled={isSubmitting}
                className="login-button flex-center"
                type="submit"
              >
                {isSubmitting && (
                  <span
                    className="animate-spin inline-block w-3 h-3 border-[3px] border-current border-t-transparent text-white rounded-full mr-2"
                    role="status"
                    aria-label="loading"
                  ></span>
                )}
                {isSubmitting
                  ? "Creating New Account"
                  : "Register to BlinkedBids"}
              </button>
            </div>
          </div>
        </form>

        <button
          aria-label="Continue with google"
          role="button"
          onClick={() => {
            signIn("google", {
              callbackUrl: "/",
              redirect: false,
            });
          }}
          className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-10 hover:bg-gray-100"
        >
          <FcGoogle className="w-5 h-5" />
          <p className="text-base font-medium ml-4 text-gray-700">
            Continue with Google
          </p>
        </button>
      </div>
    </>
  );
}
