"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addNewBank } from "@/api/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showErrorToasts } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

interface BankFormProps {
  bankType?: {
    id: number;
    bank_name: string;
    bank_code: string;
    bank_email: string;
    emi_6_months_rate: string;
    emi_9_months_rate: string;
    emi_12_months_rate: string;
    emi_18_months_rate: string;
  };
  formType: "create" | "edit";
}

const formSchema = z.object({
  bank_name: z
    .string({
      required_error: "Category Type Name is required",
    })
    .min(3, {
      message: "Category Type Name should be at least 3 characters",
    }),
  bank_code: z
    .string({
      required_error: "Bank Code is required",
    })
    .min(3, {
      message: "Bank Code should be at least 3 characters",
    }),
  bank_email: z
    .string({
      required_error: "Bank Email is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
  emi_6_months_rate: z.string({
    required_error: "6 Months Rate is required",
  }),
  emi_9_months_rate: z.string({
    required_error: "9 Months Rate is required",
  }),
  emi_12_months_rate: z.string({
    required_error: "12 Months Rate is required",
  }),
  emi_18_months_rate: z.string({
    required_error: "18 Months Rate is required",
  }),
});

export function EMIBanksForm({ bankType, formType }: BankFormProps) {
  const router = useRouter();
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bank_name: bankType?.bank_name || "",
      bank_code: bankType?.bank_code || "",
      bank_email: bankType?.bank_email || "",
      emi_6_months_rate: bankType?.emi_6_months_rate || "",
      emi_9_months_rate: bankType?.emi_9_months_rate || "",
      emi_12_months_rate: bankType?.emi_12_months_rate || "",
      emi_18_months_rate: bankType?.emi_18_months_rate || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let response;
      if (formType === "create") {
        // create category type
        response = await addNewBank(values, formType);
      }
      if (formType === "edit") {
        // edit category type
        response = await addNewBank(values, formType, bankType?.id);
      }
      if (response?.success === true) {
        if (formType === "create") {
          toast.success("New Bank added successfully");
        }
        if (formType === "edit") {
          toast.success("Bank detail updated successfully");
        }
        router.replace("/admin/banks");
      } else {
        showErrorToasts(response?.errorData);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="title-typography font-bold">
          {formType === "create" ? "Add" : "Edit"}
          EMI Bank
        </h2>

        <FormField
          control={form.control}
          name="bank_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bank_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bank_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emi_6_months_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>6 Months Rate</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter 6 months rate"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emi_9_months_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>9 Months Rate</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter 9 months rate"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emi_12_months_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>12 Months Rate</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter 12 months rate"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emi_18_months_rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>18 Months Rate</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter 18 months rate"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
