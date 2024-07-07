"use client";

import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import InputField from '@/app/(private)/admin/components/Input';
import { PostRequest } from '@/services/httpRequest';
import { zodResolver } from '@hookform/resolvers/zod';

const resetPasswordSchema = z
  .object({
    uid: z.string(),
    token: z.string(),
    new_password: z
      .string()
      .min(8, "Password must be atleast 8 characters long"),
    re_new_password: z
      .string()
      .min(8, "Password must be atleast 8 characters long"),
  })
  .refine((data) => data.new_password === data.re_new_password, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

interface Props {
  uid: string;
  token: string;
}

export default function ResetForm(props: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const router = useRouter();

  useEffect(
    () => {
      setValue("uid", props.uid);
      setValue("token", props.token);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSubmit = async (data: resetPasswordSchemaType) => {
    //console.log(data);

    const response = await PostRequest(
      "auth/users/reset_password_confirm/",
      data
    );
    if (response.status === 204) {
      toast.success("Password reset successfully");
      router.replace("/login");
    } else {
      toast.error("Password reset failed");
    }
  };

  return (
    <>
      <section className="max-w-layout py-5">
        <h1 className="text-2xl font-semibold text-gray-700 mb-8">
          Reset Password
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 bg-white rounded-xl"
        >
          <InputField
            field={{ ...register("new_password") }}
            label="New Password"
            placeholder="Enter new password"
            type="password"
            errors={errors.new_password?.message}
          />
          <InputField
            label="Confirm Password"
            field={{ ...register("re_new_password") }}
            placeholder="Confirm password"
            type="password"
            errors={errors.re_new_password?.message}
          />
          <button className="px-4 py-2 mt-4 bg-accent-4 text-white rounded-md">
            Reset Password
          </button>
        </form>
      </section>
    </>
  );
}
