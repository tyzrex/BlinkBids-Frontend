import { useEffect, useState } from "react";

import {
  useProductFormStore,
  useProductInfoStore,
} from "@/store/products/ProductInfo";

import FileGallery from "../../../components/FileList";
import { z } from "zod";
import FormButtons from "./Steppers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFFileInput from "../../../components/rhf-fileinput";
import { Form } from "@/components/ui/form";

const schema = z.object({
  image: z.array(z.instanceof(File)),
});
type FormValues = z.infer<typeof schema>;
export default function ImageForm() {
  const { setProductInfo, productInfo } = useProductInfoStore();
  console.log(productInfo.new_images);
  const { nextStep } = useProductFormStore((state) => state);
  const form = useForm<FormValues>({
    defaultValues: {
      image: [...productInfo.new_images],
    },
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = (data: FormValues) => {
    setProductInfo({
      ...productInfo,
      new_images: data.image, // Wrap data.image inside an array
    });

    nextStep();
  };

  return (
    <>
      <Form {...form}>
        <form>
          <RHFFileInput<FormValues>
            name="image"
            formLabel="Image"
            numberOfFiles={5}
          />
          <div className="mt-5">
            <FormButtons submitForm={handleSubmit(onSubmit)} />
          </div>
        </form>
      </Form>
    </>
  );
}
