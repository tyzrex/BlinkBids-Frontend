"use client";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getProductAttributes } from "@/api/actions";
import { useAction } from "@/hooks/useAction";
import { slugify } from "@/lib/utils";
import {
  useProductFormStore,
  useProductInfoStore,
} from "@/store/products/ProductInfo";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import {
  productInfoSchema,
  productInfoSchemaType,
} from "../../_schema/productInfoSchema";
import FormButtons from "./Steppers";
import RHFInput from "../../../components/rhf-input";
import RHFTextArea from "../../../components/rhf-textarea";
import RHFPopover from "../../../components/rhf-popover";
import RHFJoeditor from "../../../components/rhf-joeditor";
import RHFSwitch from "../../../components/rhf-switch";

export default function ProductForm() {
  const {
    productInfo,
    setProductInfo,
    categories,
    brands,
    setAttributes,
    campaigns,
  } = useProductInfoStore((state) => state);

  console.log(productInfo);

  const { nextStep } = useProductFormStore((state) => state);
  const { execute } = useAction(getProductAttributes, {
    onSuccess: (data) => {
      //console.log(data);
      setAttributes(data);
    },
    onError: () => {
      setAttributes(null);
      toast.error("No attribute found for this product category");
    },
  });

  const getCampaignName = (id: number) => {
    if (id === null) {
      return campaigns?.results?.find(
        (camp: any) => camp.name === "Default Campaign"
      )?.name;
    }
    return campaigns?.find((camp: any) => camp.id === id)?.name;
  };

  const getDefaultCampaignId = () => {
    return campaigns?.find((camp: any) => camp.name === "Default Campaign")?.id;
  };

  const form = useForm<productInfoSchemaType>({
    defaultValues: {
      description: productInfo?.description || "",
      warranty: productInfo?.warranty || "",
      name: productInfo?.name || "",
      slug: productInfo?.slug || "",
      sku: productInfo?.sku || "",
      short_description: productInfo?.short_description || "",
      category: productInfo?.category || "",
      brand: productInfo?.brand || "",
      highlights: productInfo?.highlights || "",
      status: productInfo?.status || false,
      emi_available: productInfo?.emi_available || false,
      campaign: productInfo?.campaign,
    },
    resolver: zodResolver(productInfoSchema),
  });

  const { handleSubmit, setValue, watch } = form;

  const onSubmit = async (data: productInfoSchemaType) => {
    setProductInfo({
      ...productInfo,
      ...data,
    });
    // execute(category);

    nextStep();
  };

  useEffect(() => {
    if (!watch("campaign")) {
      return;
    }
    if (getCampaignName(watch("campaign")) === "Default Campaign") {
      setValue("slug", slugify(watch("name")));
    } else {
      setValue(
        "slug",
        slugify(
          watch("name") + "-" + slugify(getCampaignName(watch("campaign")))
        )
      );
    }
  }, [watch("name"), watch("campaign")]);

  useEffect(() => {
    setValue("campaign", getDefaultCampaignId());
  }, [campaigns]);

  return (
    <>
      <Form {...form}>
        <form>
          <div className="grid xl:grid-cols-2 gap-10 w-full mb-5">
            <div className="grid gap-3">
              <h1 className="text-2xl font-semibold text-gray-700 mt-4">
                General Info
              </h1>
              <RHFInput<productInfoSchemaType>
                formLabel="Product Name"
                placeHolder="Enter Product Name"
                name="name"
              />

              <RHFTextArea<productInfoSchemaType>
                formLabel="Product Short Description"
                placeHolder="Enter short description"
                name="short_description"
              />

              <RHFPopover<productInfoSchemaType>
                name="category"
                options={categories}
                formLabel="Enter category"
                placeHolder="Enter Product Category"
              />

              <RHFInput<productInfoSchemaType>
                name="slug"
                formLabel="Slug"
                placeHolder="Enter Slug"
              />
            </div>

            <div className="w-full">
              <h1 className="text-2xl font-semibold text-gray-700 my-4">
                Product Details
              </h1>

              <RHFInput<productInfoSchemaType>
                formLabel="SKU"
                placeHolder="Enter product sku"
                name="sku"
              />

              <RHFPopover<productInfoSchemaType>
                name="brand"
                options={brands}
                formLabel="Brand"
                placeHolder="Enter Product Brand"
              />
              <RHFTextArea<productInfoSchemaType>
                formLabel="Product highlights"
                placeHolder="Enter highlights"
                name="highlights"
              />
              <RHFPopover<productInfoSchemaType>
                name="campaign"
                options={campaigns}
                formLabel="Campaign"
                placeHolder="Enter Product Campaign"
              />

              <div className="flex flex-col gap-6 mt-5">
                <RHFSwitch<productInfoSchemaType>
                  name="emi_available"
                  formLabel="EMI Availability"
                />
                <RHFSwitch<productInfoSchemaType>
                  name="status"
                  formLabel="Product Status"
                />
              </div>
            </div>
          </div>

          <RHFJoeditor<productInfoSchemaType>
            name="warranty"
            formLabel="Warranty"
            placeHolder="Enter Warranty Info"
          />
          <RHFJoeditor<productInfoSchemaType>
            name="description"
            formLabel="Description"
            placeHolder="Enter Description"
          />

          <FormButtons submitForm={handleSubmit(onSubmit)} />
        </form>
      </Form>
    </>
  );
}
