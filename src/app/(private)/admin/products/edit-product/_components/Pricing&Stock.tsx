"use client";
import { useForm } from "react-hook-form";

import {
  useProductFormStore,
  useProductInfoStore,
} from "@/store/products/ProductInfo";

import InputField from "../../../components/Input";
import { PricingType } from "../../_schema/pricingSchema";
import FormButtons from "./Steppers";

export default function PricingStockForm() {
  const { productInfo, setProductInfo } = useProductInfoStore((state) => state);
  //console.log(productInfo);
  const { nextStep } = useProductFormStore((state) => state);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PricingType>({
    defaultValues: {
      price: productInfo?.price || 0,
      discounted_price: productInfo?.discounted_price || 0,
    },
  });
  const onSubmit = (data: PricingType) => {
    //console.log(data);
    setProductInfo({ ...productInfo, ...data });
    nextStep();
  };
  return (
    <>
      <div className="grid gap-3 mb-5">
        <InputField
          errors={errors.price?.message}
          field={{ ...register("price") }}
          label="Price (Rs.)"
          type="number"
          placeholder="Enter price"
        />
        <InputField
          errors={errors.discounted_price?.message}
          field={{ ...register("discounted_price") }}
          label="Discounted Price"
          type="number"
          placeholder="Enter discount"
        />
      </div>
      <FormButtons submitForm={handleSubmit(onSubmit)} />
    </>
  );
}
