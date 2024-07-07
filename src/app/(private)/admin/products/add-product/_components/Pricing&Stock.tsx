"use client";
import { useForm } from "react-hook-form";

import {
  useProductFormStore,
  useProductInfoStore,
} from "@/store/products/ProductInfo";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../../../components/Input";
import { pricingSchema, PricingType } from "../../_schema/pricingSchema";
import FormButtons from "./Steppers";
import RHFInput from "../../../components/rhf-input";
import { Form } from "@/components/ui/form";

export default function PricingStockForm() {
  const { productInfo, setProductInfo } = useProductInfoStore((state) => state);
  //console.log(productInfo);
  const { nextStep } = useProductFormStore((state) => state);
  const form = useForm<PricingType>({
    defaultValues: {
      price: productInfo?.price || 0,
      discounted_price: productInfo?.discounted_price || 0,
    },
    resolver: zodResolver(pricingSchema),
    mode: "onChange",
  });
  const onSubmit = (data: PricingType) => {
    //console.log(data);
    setProductInfo({ ...productInfo, ...data });
    nextStep();
  };

  return (
    <>
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <RHFInput<PricingType>
            name="price"
            placeHolder="Enter the price"
            type="number"
            formLabel="Price"
          />
          <RHFInput<PricingType>
            name="discounted_price"
            placeHolder="Enter the discounted price"
            type="number"
            formLabel="Discounted Price"
          />
          <FormButtons submitForm={form.handleSubmit(onSubmit)} />
        </form>
      </Form>
    </>
  );
}
