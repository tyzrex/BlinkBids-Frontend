"use client";

import { useEffect, useState } from "react";

import { CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Schema, z } from "zod";

import { addNewCategory } from "@/api/actions";
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
import { cn, showErrorToasts, slugify } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import RHFJoeditor from "../../components/rhf-joeditor";

const DynamicJoEditor = dynamic(() => import("../../components/joeditor"), {
  ssr: false,
});

interface CategoryFormType {
  category?: {
    id?: number;
    name: string;
    label: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    slug: string;
    type: string;
    parent?: number;
    description?: string;
  };
  category_type_response?: any;
  formType: "create" | "edit";
  type: "child" | "parent";
}

const formSchema = z
  .object({
    name: z
      .string({
        required_error: "Category Type Name is required",
      })
      .min(3, {
        message: "Category Type Name should be at least 3 characters",
      }),
    slug: z
      .string({
        required_error: "Category Type Name is required",
      })
      .min(3, {
        message: "Category slug is required",
      }),
    meta_title: z.string({
      required_error: "Category meta title is required",
    }),
    meta_keywords: z.string({
      required_error: "Category meta keywords is required",
    }),
    meta_description: z.string({
      required_error: "Category meta description is required",
    }),
    label: z.string({
      required_error: "Category label is required",
    }),
    type: z.enum(["child", "parent"], {
      required_error: "Category type is required",
    }),
    parent: z.coerce.number().nullable().optional(),
    description: z.string().optional(),
  })
  .refine((data) => {
    if (data.type === "child") {
      return data.parent !== null;
    }
    return true;
  });

export function CategoryForm({
  category,
  formType,
  category_type_response,
  type,
}: CategoryFormType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      label: category?.label || "",
      meta_title: category?.meta_title || "",
      meta_description: category?.meta_description || "",
      meta_keywords: category?.meta_keywords || "",
      type: type,
      description: category?.description || "",
      parent: category?.parent || null,
    },
  });
  const { setValue } = form;
  const nameWatch = form.watch("name");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  console.log(form.watch("description"));

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (formType === "create") {
        // create category type
        const response = await addNewCategory(values, formType);
        if (response.success === true) {
          toast.success(response.message);
          if (type === "child") {
            router.replace("/admin/category-children");
          } else {
            router.replace("/admin/category");
          }
        } else {
          showErrorToasts(response.errorData);
        }
      }
      if (formType === "edit") {
        // edit category type
        const response = await addNewCategory(values, formType, category?.id);
        if (response.success === true) {
          toast.success(response.message);
          if (type === "child") {
            router.replace("/admin/category-children");
          } else {
            router.replace("/admin/category");
          }
        } else {
          showErrorToasts(response.errorData);
        }
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  useEffect(
    () => {
      if (category?.slug === null) {
        form.setValue("slug", "");
      } else if (formType === "edit" && category?.slug !== null) {
        if (!category?.slug) return;
        form.setValue("slug", category?.slug);
      } else {
        form.setValue("slug", slugify(nameWatch));
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [nameWatch]
  );

  useEffect(() => {
    form.setValue("type", type);
  }, [type]);

  return (
    <section className="bg-white p-10">
      <h2 className="title-typography">Add Category</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Type Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a category type name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Type label</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a category type label" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Type slug</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a category slug" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <RHFJoeditor<z.infer<typeof formSchema>>
            formLabel="Description"
            name="description"
            placeHolder="Enter a category description"
          />

          <FormField
            control={form.control}
            name="meta_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Type Meta Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a category type meta title"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Type Meta Keywords</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a category type meta keywords"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Type Meta Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a category type meta description"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {type === "child" && (
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={category?.type ? category?.type : type}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.watch("type") === "child" && (
            <FormField
              control={form.control}
              name="parent"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Parent Category</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-start",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? category_type_response.find(
                                (category: any) => category.id === field.value
                              )?.name
                            : "Select category"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Parent Category..."
                          className="h-9"
                        />
                        <CommandEmpty>No parent found.</CommandEmpty>
                        <CommandGroup>
                          {category_type_response.map((category: any) => (
                            <CommandItem
                              value={category.id}
                              key={category.id}
                              onSelect={() => {
                                form.setValue("parent", category.id);
                                setOpen(false);
                              }}
                            >
                              {category.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  category.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
}
