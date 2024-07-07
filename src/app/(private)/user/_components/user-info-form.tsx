"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { updateUserInfo } from "@/api/user-actions";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { nepalDistricts } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  district: z
    .string()
    .min(2, { message: "District must be at least 2 characters." })
    .refine((value) => nepalDistricts.includes(value), {
      message: "Invalid District",
    }),
  address_description: z.string(),
});

export function ProfileForm(props: z.infer<typeof profileFormSchema>) {
  const { data: session, update } = useSession();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: props?.name ?? "",
      address: props?.address ?? "",
      district:
        nepalDistricts.find((district) => district === props?.district) ?? "",
      address_description: props?.address_description ?? "",
    },
  });
  const { setValue } = form;
  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const res = await updateUserInfo(values);
      if (res === 200) {
        toast.success("Profile Updated Successfully");
        await update({
          ...session!,
          user: {
            ...(session?.user ?? {}),
            name: values.name,
          },
        });
      }
      router.push("/user/dashboard");
    } catch (err: any) {
      toast.error(err.message);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full mt-10"
      >
        <h3 className="text-2xl font-semibold mb-5">My Profile Details</h3>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription>
                This name will be used for order checkout.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger className="w-full">
                    <Input placeholder="Enter District" {...field} readOnly />
                  </PopoverTrigger>
                  <PopoverContent className="lg:w-[800px] p-0 mt-2 h-[200px]">
                    <Command>
                      <CommandInput
                        placeholder="Search District..."
                        className="h-9 px-10"
                      />
                      <CommandEmpty>No District found.</CommandEmpty>
                      <CommandGroup>
                        {nepalDistricts.map((district) => (
                          <CommandItem
                            key={district}
                            onSelect={(currentValue: any) => {
                              setValue("district", district);
                              setOpen(false);
                            }}
                          >
                            {district}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                This name will be used for order checkout.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Billing Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormDescription>
                The order will be delivered to this address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter address description" {...field} />
              </FormControl>
              <FormDescription>
                This address description will be used for order checkout.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="float-right bg-accent-2 font-bold" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
