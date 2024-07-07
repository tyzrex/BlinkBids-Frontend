"use client";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getProductAttributes } from "@/api/actions";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useAction } from "@/hooks/useAction";
import {
  useProductFormStore,
  useProductInfoStore,
} from "@/store/products/ProductInfo";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../../../components/Input";
import JoEditor from "../../../components/joeditor";
import TextArea from "../../../components/TextArea";
import {
  productInfoSchema,
  productInfoSchemaType,
} from "../../_schema/productInfoSchema";
import FormButtons from "./Steppers";
import { slugify } from "@/lib/utils";

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
      setAttributes(data);
    },
    onError: () => {
      setAttributes(null);
      toast.error("No attribute found for this product category");
    },
  });

  const [campaign, setCampaign] = useState<string>(
    campaigns?.results?.find(
      (campaign: any) => campaign.id === productInfo?.campaign
    )?.name || "Default Campaign"
  );
  const [category, setCategory] = useState<string>(
    categories?.find((cat: any) => cat.name === productInfo?.category)?.name ||
      ""
  );
  const [brand, setBrand] = useState<string>(
    brands?.find((brand: any) => brand.name === productInfo?.brand)?.name || ""
  );

  const [open, setOpen] = useState<boolean>(false);
  const [openBrand, setOpenBrand] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<productInfoSchemaType>({
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
      status: productInfo?.status || true,
      emi_available: productInfo?.emi_available || false,
      campaign: productInfo?.campaign || "",
    },
    resolver: zodResolver(productInfoSchema),
  });

  const [campaignOpen, setCampaignOpen] = useState<boolean>(false);
  const onSubmit = async (data: productInfoSchemaType) => {
    //console.log(data);
    setProductInfo({
      ...productInfo,
      ...data,
    });
    execute(category);
    //console.log(category);

    nextStep();
  };

  useEffect(() => {
    if (campaign === "Default Campaign") {
      setValue("slug", slugify(watch("name")));
    } else {
      setValue("slug", slugify(watch("name") + "-" + slugify(campaign)));
    }
  }, [watch("name"), watch("campaign")]);

  return (
    <>
      <form>
        <div className="grid xl:grid-cols-2 gap-10 w-full mb-5">
          <div className="grid gap-3">
            <h1 className="text-2xl font-semibold text-gray-700 mt-4">
              General Info
            </h1>
            <InputField
              errors={errors.name?.message}
              field={{ ...register("name") }}
              label="Product Name"
              type="text"
              placeholder="e.g. iPhone 13 Pro Max"
            />

            <TextArea
              errors={errors.short_description?.message}
              field={{ ...register("short_description") }}
              label="Short Description"
              type="text"
              placeholder="e.g. Short Description"
            />
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="cursor-pointer text-left">
                {/* <InputField
                  errors={errors.category?.message}
                  field={{ ...register("category") }}
                  label="Category"
                  type="text"
                  placeholder="e.g. Mobile Phone"
                  disabled={true}
                /> */}
                <label
                  className="text-gray-400 font-semibold text-sm"
                  htmlFor="category"
                >
                  Category
                </label>
                <input
                  className={`block w-full  px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white border-2 border-gray-200 rounded-[12px] ${
                    errors.category ? "border-red-500" : ""
                  }`}
                  value={category}
                  readOnly={true}
                />
                {/* {errors.category && (
                  <p className="text-red-500">{errors.category?.message}</p>
                )} */}
              </PopoverTrigger>
              <PopoverContent className="p-0 h-[300px] w-[400px]">
                <Command>
                  <CommandInput
                    placeholder="Search for a category.."
                    className="h-9"
                  />
                  <CommandEmpty>No Categories found.</CommandEmpty>
                  <CommandGroup>
                    {categories?.map((category: any, idx: number) => (
                      <CommandItem
                        key={idx}
                        onSelect={() => {
                          setValue("category", category.id);
                          setCategory(category.name);
                          setOpen(false);
                        }}
                      >
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <InputField
              errors={errors.slug?.message}
              field={{ ...register("slug") }}
              label="Slug"
              type="text"
              placeholder="e.g. iphone-13-pro-max"
            />
          </div>

          <div className="w-full">
            <h1 className="text-2xl font-semibold text-gray-700 my-4">
              Product Details
            </h1>
            <InputField
              errors={errors.sku?.message}
              field={{ ...register("sku") }}
              label="SKU"
              type="text"
              placeholder="e.g. IP-13-PRO-MAX"
            />

            <Popover open={openBrand} onOpenChange={setOpenBrand}>
              <PopoverTrigger className="cursor-pointer text-left">
                <label
                  className="text-gray-400 font-semibold text-sm"
                  htmlFor="brand"
                >
                  Brand
                </label>
                <input
                  className={`block w-full  px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white border-2 border-gray-200 rounded-[12px] ${
                    errors.brand ? "border-red-500" : ""
                  }`}
                  value={brand}
                  readOnly={true}
                />
                {/* {errors.brand && (
                  <p className="text-red-500">{errors.brand?.message}</p>
                )} */}
              </PopoverTrigger>
              <PopoverContent className="p-0 h-[300px] w-[400px]">
                <Command>
                  <CommandInput
                    placeholder="Search for a brand.."
                    className="h-9"
                  />
                  <CommandEmpty>No Brands found.</CommandEmpty>
                  <CommandGroup>
                    {brands?.map((brand: any, idx: number) => (
                      <CommandItem
                        key={idx}
                        onSelect={(currentValue: any) => {
                          setValue("brand", brand.id);
                          setBrand(brand.name);
                          setOpenBrand(false);
                        }}
                      >
                        {brand.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <TextArea
              errors={errors.highlights?.message}
              field={{ ...register("highlights") }}
              label="Product Highlights"
              type="text"
              placeholder="e.g. Highlights"
            />

            <Popover open={campaignOpen} onOpenChange={setCampaignOpen}>
              <PopoverTrigger className="cursor-pointer text-left">
                {/* <InputField
                  errors={errors.category?.message}
                  field={{ ...register("category") }}
                  label="Category"
                  type="text"
                  placeholder="e.g. Mobile Phone"
                  disabled={true}
                /> */}
                <label
                  className="text-gray-400 font-semibold text-sm"
                  htmlFor="campaign"
                >
                  Campaign
                </label>
                <input
                  className={`block w-full  px-4 py-2 mt-2 text-gray-700 placeholder:text-gray-500 font-medium bg-white border-2 border-gray-200 rounded-[12px] ${
                    errors.campaign ? "border-red-500" : ""
                  }`}
                  value={campaign}
                  readOnly={true}
                />
                {/* {errors.category && (
                  <p className="text-red-500">{errors.category?.message}</p>
                )} */}
              </PopoverTrigger>
              <PopoverContent className="p-0 h-[300px] w-[400px]">
                <Command>
                  <CommandInput
                    placeholder="Search for a category.."
                    className="h-9"
                  />
                  <CommandEmpty>No Categories found.</CommandEmpty>
                  <CommandGroup>
                    {campaigns?.results?.map((campaign: any, idx: number) => (
                      <CommandItem
                        // placeholder="Search for a category.."
                        key={idx}
                        onSelect={() => {
                          setValue("campaign", campaign.id);
                          setCampaign(campaign.name);
                          setCampaignOpen(false);
                        }}
                      >
                        {campaign.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl font-semibold text-gray-700 mt-4">
                Availability and Config
              </h1>
              {/* toggle buittons */}
              <div className="flex items-center gap-5">
                <span className="text-gray-400 font-semibold text-sm">
                  Is Active
                </span>
                <Switch
                  defaultChecked={productInfo?.status}
                  onCheckedChange={(e) => {
                    setValue("status", e);
                  }}
                />
              </div>
              <div className="flex items-center gap-5">
                <span className="text-gray-400 font-semibold text-sm">
                  Emi Available
                </span>
                <Switch
                  defaultChecked={productInfo?.emi_available}
                  onCheckedChange={(e) => {
                    setValue("emi_available", e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <label className="text-gray-400 font-semibold text-sm">
          Warranty Details
        </label>
        <JoEditor
          registerName="warranty"
          setValue={setValue}
          placeholder="Warranty"
          value={productInfo?.warranty}
        />
        {errors.warranty?.message && (
          <p className="text-red-500">{errors.warranty?.message}</p>
        )}

        <div className="mt-5">
          <label className="text-gray-400 font-semibold text-sm ">
            Description
          </label>
          <JoEditor
            registerName="description"
            setValue={setValue}
            placeholder="Description"
            value={productInfo?.description}
          />
          {errors.description?.message && (
            <p className="text-red-500">{errors.description?.message}</p>
          )}
        </div>

        <FormButtons submitForm={handleSubmit(onSubmit)} />
      </form>
    </>
  );
}
