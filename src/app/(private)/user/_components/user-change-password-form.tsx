"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RHFInput from "../../admin/components/rhf-input";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const passwordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
  });

type passwordSchemaType = z.infer<typeof passwordSchema>;

export default function ChangePasswordForm() {
  const form = useForm<passwordSchemaType>({
    resolver: zodResolver(passwordSchema),
  });

  return (
    <>
      <Form {...form}>
        <form className="space-y-6">
          <RHFInput<passwordSchemaType>
            name="oldPassword"
            formLabel="Old Password"
            type="password"
            placeHolder="Old Password"
          />
          <RHFInput<passwordSchemaType>
            name="newPassword"
            formLabel="New Password"
            type="password"
            placeHolder="New Password"
          />
          <RHFInput<passwordSchemaType>
            name="confirmPassword"
            formLabel="Confirm Password"
            type="password"
            placeHolder="Confirm Password"
          />
          <Button
            type="submit"
            className="btn-primary float-right"
            disabled={form.formState.isSubmitting}
          >
            Change Password
          </Button>
        </form>
      </Form>
    </>
  );
}
