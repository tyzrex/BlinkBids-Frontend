"use client";

import { Controller, useForm } from "react-hook-form";
import { productSchema, productSchemaType } from "../_schema/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import RHFInput from "../../components/rhf-input";
import RHFTextArea from "../../components/rhf-textarea";
import RHFPopover from "../../components/rhf-popover";
import RHFSwitch from "../../components/rhf-switch";
import RHFJoeditor from "../../components/rhf-joeditor";
import { ProductInfo } from "@/store/products/ProductInfo";
import { useEffect, useState } from "react";
import RHFFileInput from "../../components/rhf-fileinput";
import { UploadedFilesCard } from "../../components/uploaded-files";
import ProductPreview from "../edit-product/_components/product-preview";
import { EmptyCard } from "../../components/empty-card";
import { addNewProduct, editProduct } from "@/api/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { showErrorToasts, slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getChildCategories } from "@/api/cms";

type EditProductFormProps = {
  productInfo?: ProductInfo;
  brands: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
  campaigns: {
    id: number;
    name: string;
  }[];
  formType: "add" | "edit";
};

const steps = [
  {
    id: 1,
    name: "Product Info",
    fields: [
      "name",
      "short_description",
      "category",
      "slug",
      "sku",
      "brand",
      "highlights",
      "status",
      "emi_available",
      "campaign",
    ],
  },

  {
    id: 2,
    name: "Pricing and Description",
    fields: ["description", "warranty", "price", "discounted_price"],
  },
  {
    id: 3,
    name: "Specifications",
  },
  {
    id: 4,
    name: "SEO",
    fields: ["meta_title", "meta_keywords", "meta_description", "custom_code"],
  },
  {
    id: 5,
    name: "Images",
    fields: ["images", "new_images"],
  },

  {
    id: 6,
    name: "Summary",
  },
];

export default function EditProductForm({
  productInfo,
  brands,
  categories,
  campaigns,
  formType,
}: EditProductFormProps) {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm<productSchemaType>({
    defaultValues: {
      name: productInfo?.name ?? "",
      sku: productInfo?.sku ?? "",
      slug: productInfo?.slug ?? "",
      short_description: productInfo?.short_description ?? "",
      category: productInfo?.category ?? "",
      brand: productInfo?.brand ?? "",
      highlights: productInfo?.highlights ?? "",
      status: productInfo?.status ?? false,
      emi_available: productInfo?.emi_available ?? false,
      campaign:
        productInfo?.campaign ??
        campaigns?.find((camp: any) => camp.name === "Default Campaign")?.id,
      price: productInfo?.price ?? 0,
      discounted_price: productInfo?.discounted_price ?? 0,
      description: productInfo?.description ?? "",
      meta_title: productInfo?.meta_title ?? "",
      meta_keywords: productInfo?.meta_keywords ?? "",
      meta_description: productInfo?.meta_description ?? "",
      images: productInfo?.images ?? [],
      new_images: productInfo?.new_images ?? [],
      warranty: productInfo?.warranty ?? "",
      custom_code: productInfo?.custom_code ?? "",
    },
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const { trigger, control } = form;
  const router = useRouter();

  console.log(form.formState.errors);

  const handleSubmit = async (data: productSchemaType) => {
    console.log("here");
    const formData = new FormData();

    formData.append("name", data.name || "");
    formData.append("sku", data.sku || "");
    formData.append("short_description", data.short_description || "");
    formData.append("description", data.description || "");
    formData.append("category", data.category || "");
    formData.append("brand", data.brand || "");
    formData.append("status", data?.status?.toString() || "");
    formData.append("price", (data.price as any) || "");
    formData.append(
      "discounted_price",
      data?.discounted_price?.toString() || ""
    );
    formData.append("emi_available", data?.emi_available?.toString() || "");
    formData.append("warranty", data.warranty || "");
    formData.append("meta_title", data.meta_title || "");
    formData.append("meta_description", data.meta_description || "");
    formData.append("meta_keywords", data.meta_keywords || "");
    formData.append("custom_code", data.custom_code || "");
    formData.append("highlights", data.highlights || "");
    formData.append("slug", data.slug || "");
    formData.append("campaign", data.campaign?.toString() || "");
    if (data.images) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    if (data.new_images) {
      data.new_images.forEach((image) => {
        formData.append("new_images", image);
      });
    }

    console.log(Object.fromEntries(formData.entries()) as productSchemaType);

    if (formType === "add") {
      console.log("here");
      const response = await addNewProduct(formData);
      console.log(response);
      if (response.success) {
        toast.success(response.message);
        router.replace("/admin/products");
      } else {
        showErrorToasts(response.errorData);
      }
    }
    if (formType === "edit") {
      formData.append("id", productInfo?.id?.toString() || "");
      if (!data) {
        return;
      }
      const response = await editProduct(formData);
      if (response.success) {
        toast.success(response.message);
        router.replace("/admin/products");
      } else {
        showErrorToasts(response.errorData);
      }
    }
  };

  type FieldName = keyof productSchemaType;

  const next = async () => {
    const fields = steps[currentStep].fields;
    if (fields) {
      const output = await trigger(fields as FieldName[], {
        shouldFocus: true,
      });

      if (!output) return;
    }

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };
  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const getCampaignName = (id: number) => {
    if (id === null) {
      return campaigns?.find((camp) => camp.name === "Default Campaign")?.name;
    }
    return campaigns?.find((camp) => camp.id === id)?.name;
  };

  const getDefaultCampaignId = () => {
    return campaigns?.find((camp: any) => camp.name === "Default Campaign")?.id;
  };

  useEffect(() => {
    form.getValues("campaign") === getDefaultCampaignId()
      ? form.setValue("slug", slugify(form.getValues("name") ?? ""))
      : form.setValue(
          "slug",
          slugify(form.getValues("name") ?? "") +
            "-" +
            slugify(getCampaignName(form.getValues("campaign") ?? "") ?? "")
        );
  }, [form.watch("campaign"), form.watch("name")]);
  return (
    <>
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    Step {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {currentStep === 0 && (
            <div className="grid xl:grid-cols-2 gap-10 w-full mb-5 mt-10">
              <div className="grid gap-3 ">
                <h1 className="text-2xl font-semibold text-gray-700 mt-4">
                  General Info
                </h1>
                <RHFInput<productSchemaType>
                  formLabel="Product Name"
                  placeHolder="Enter Product Name"
                  name="name"
                />

                <RHFTextArea<productSchemaType>
                  formLabel="Product Short Description"
                  placeHolder="Enter short description"
                  name="short_description"
                  className="h-52"
                />

                <RHFPopover<productSchemaType>
                  name="category"
                  options={categories}
                  formLabel="Enter category"
                  placeHolder="Enter Product Category"
                />

                <RHFInput<productSchemaType>
                  name="slug"
                  formLabel="Slug"
                  placeHolder="Enter Slug"
                />
              </div>

              <div className="w-full flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-gray-700 my-4">
                  Product Details
                </h1>

                <RHFInput<productSchemaType>
                  formLabel="SKU"
                  placeHolder="Enter product sku"
                  name="sku"
                />

                <RHFPopover<productSchemaType>
                  name="brand"
                  options={brands}
                  formLabel="Brand"
                  placeHolder="Enter Product Brand"
                />
                <RHFTextArea<productSchemaType>
                  formLabel="Product highlights"
                  placeHolder="Enter highlights"
                  name="highlights"
                />
                <RHFPopover<productSchemaType>
                  name="campaign"
                  options={campaigns}
                  formLabel="Campaign"
                  placeHolder="Enter Product Campaign"
                />

                <div className="flex flex-col gap-6 mt-5">
                  <RHFSwitch<productSchemaType>
                    name="emi_available"
                    formLabel="EMI Availability"
                  />
                  <RHFSwitch<productSchemaType>
                    name="status"
                    formLabel="Product Status"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="flex flex-col gap-5 mt-10">
              <RHFInput<productSchemaType>
                name="price"
                placeHolder="Enter the price"
                type="number"
                formLabel="Price"
              />
              <RHFInput<productSchemaType>
                name="discounted_price"
                placeHolder="Enter the discounted price"
                type="number"
                formLabel="Discounted Price"
              />
              <RHFJoeditor<productSchemaType>
                name="warranty"
                formLabel="Warranty"
                placeHolder="Enter Warranty Info"
              />
              <RHFJoeditor<productSchemaType>
                name="description"
                formLabel="Description"
                placeHolder="Enter Description"
              />
            </div>
          )}

          {currentStep === 2 && (
            <>
              <EmptyCard
                title="No Specifications Available Right Now"
                description="Please add specifications for the product category"
                className="w-full mt-10"
              />
            </>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col gap-5 mt-10">
              <RHFInput<productSchemaType>
                name="meta_title"
                placeHolder="Enter the meta title"
                type="text"
                formLabel="Price"
              />
              <RHFInput<productSchemaType>
                name="meta_description"
                placeHolder="Enter the meta description"
                type="text"
                formLabel="Meta Description"
              />
              <RHFInput<productSchemaType>
                name="meta_keywords"
                placeHolder="Enter the keywords"
                type="text"
                formLabel="Meta Keywords"
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="mt-10 space-y-10">
              <FormField
                control={control}
                name={"images"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <UploadedFilesCard
                        interfaceTitle="Previously Uploaded Images"
                        uploadedFiles={
                          form.getValues("images")?.map((image, index) => ({
                            key: crypto.randomUUID(),
                            name: image,
                            url: `/api/images/${image}`,
                          })) ?? []
                        }
                        onValueChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <RHFFileInput<productSchemaType>
                name="new_images"
                formLabel="New Images"
                numberOfFiles={10}
              />
            </div>
          )}

          {currentStep === 5 && <ProductPreview />}

          <div className="mt-8 pt-5">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prev}
                disabled={currentStep === 0}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                disabled={currentStep === steps.length - 1}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </>
              </button>
            </div>
          </div>
          {currentStep === steps.length - 1 && (
            <Button type="submit" className="mt-5 float-right">
              {formType === "add" ? "Add Product" : "Edit Product"}
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}
