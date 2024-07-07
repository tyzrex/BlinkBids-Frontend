"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import {
  useProductFormStore,
  useProductInfoStore,
} from "@/store/products/ProductInfo";

import InputField from "../../../components/Input";
import FormButtons from "./Steppers";

export default function SpecificationForm() {
  const { attributes, setProductInfo, productInfo } = useProductInfoStore(
    (state) => state
  );
  //console.log(attributes);
  const { nextStep } = useProductFormStore((state) => state);
  const [schema, setSchema] = useState<any>({});

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      ...schema,
    },
  });

  const onSubmit = (data: any) => {
    setProductInfo({ ...productInfo, attributes: data });
    nextStep();
  };

  useEffect(
    () => {
      if (attributes === null) return;
      let tempSchema: any = {};
      if (productInfo?.attributes) {
        // If attributes are already present in productInfo, use them for default values
        attributes?.attributes?.forEach((attribute: string) => {
          //@ts-ignore
          tempSchema[attribute] = productInfo.attributes[attribute] || "";
        });
      } else {
        attributes?.attributes?.forEach((attribute: string) => {
          tempSchema[attribute] = "";
        });
      }
      setSchema(tempSchema);

      Object.entries(tempSchema).forEach(([key, value]) => {
        setValue(key, value);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [attributes]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {attributes !== null ? (
          <div className="grid grid-cols-2 gap-5">
            {attributes?.attributes?.map((attribute: string, idx: number) => {
              return (
                <div key={idx}>
                  <InputField
                    errors={""}
                    field={{ ...register(attribute) }}
                    label={attribute}
                    type="text"
                    placeholder="Enter attribute"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className="py-5">
              <h1 className="text-3xl font-bold text-title-text">Attributes</h1>
              <h2 className="text-lg font-bold text-title-text pt-5">
                No attributes found for this category. Skip this step
              </h2>
            </div>
          </>
        )}
        <FormButtons submitForm={handleSubmit(onSubmit)} />
      </form>
    </>
  );
}
