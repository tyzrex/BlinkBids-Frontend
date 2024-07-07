"use client";

import { useState } from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addNewCampaign } from "@/api/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  cn,
  convertToDateOnly,
  getImageData,
  showErrorToasts,
} from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFFileInput from "../../components/rhf-fileinput";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z
    .string({
      required_error: "A name is required.",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    }),
  description: z
    .string({
      required_error: "A description is required.",
    })
    .min(2, {
      message: "Description must be at least 2 characters.",
    }),
  status: z
    .string({
      required_error: "A status is required.",
    })
    .min(2, {
      message: "Status must be at least 2 characters.",
    }),
  budget: z.coerce.number({
    required_error: "A budget is required.",
  }),
  start_date: z.date({
    required_error: "A date of start is required.",
  }),
  end_date: z.date({
    required_error: "A date of start is required.",
  }),
  is_active: z
    .string({
      required_error: "Please select a valid option.",
    })
    .refine(
      (val) => ["true", "false"].includes(val),
      "Please select a valid option."
    ),
  image: z
    .any({
      required_error: "An image is required.",
    })
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .refine(
      (files) => files?.[0]?.size < MAX_FILE_SIZE,
      `Max image size is 5MB.`
    ),
});

export default function AddCampaign(props: any) {
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("budget", values.budget.toFixed());
    formData.append("start_date", convertToDateOnly(values.start_date));
    formData.append("end_date", convertToDateOnly(values.end_date));
    formData.append("status", values.status);
    formData.append("image", values.image[0]);
    formData.append("is_active", values.is_active);

    const response = await addNewCampaign(formData);
    if (response.success === true) {
      toast.success("New campaign created successfully");
      router.replace("/admin/campaigns");
    } else {
      showErrorToasts(response.errorData);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full px-10 pt-10 pb-20 bg-white"
      >
        <h3 className="text-2xl font-semibold">Add New Campaign</h3>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Campaign Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Campaign Description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="Campaign Status" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget</FormLabel>
              <FormControl>
                <Input
                  type={"number"}
                  placeholder="Campaign Budget"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("2024-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("2024-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Active</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"true"}>Yes</SelectItem>
                  <SelectItem value={"false"}>No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...rest}
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    setPreview(displayUrl ? displayUrl : null);
                    onChange(files);
                  }}
                />
              </FormControl>

              <FormMessage />

              {preview && (
                <div className="mt-2 ">
                  <h4 className="text-sm font-semibold">Preview</h4>
                  <div className="w-full h-64 flex items-start">
                    <Image
                      src={preview}
                      alt="Preview"
                      width={0}
                      height={0}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </FormItem>
          )}
        /> */}
        <RHFFileInput<z.infer<typeof formSchema>>
          name="image"
          formLabel="Image"
          numberOfFiles={1}
        />

        <Button className="float-right bg-accent-2 font-bold" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
