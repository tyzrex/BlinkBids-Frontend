import { useForm } from "react-hook-form";
import { seoSchema, seoSchemaType } from "../../_schema/seoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../components/Input";
import CircleLoader from "@/components/ui/CircleLoader";
import dynamic from "next/dynamic";
import {
  useProductInfoStore,
  useProductFormStore,
} from "@/store/products/ProductInfo";
import FormButtons from "./Steppers";
import { useAction } from "@/hooks/useAction";
import { addNewProduct } from "@/api/actions";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false, loading: () => <CircleLoader /> }
);

export default function SeoForm() {
  const { productInfo, setProductInfo } = useProductInfoStore((state) => state);
  const { nextStep } = useProductFormStore((state) => state);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      meta_title: productInfo?.meta_title || "",
      meta_description: productInfo?.meta_description || "",
      meta_keywords: productInfo?.meta_keywords || "",
      custom_code: productInfo?.custom_code || "",
    },
    resolver: zodResolver(seoSchema),
  });

  const onSubmit = (data: seoSchemaType) => {
    setProductInfo({
      ...productInfo,
      ...data,
    });
    //get the updated productInfo from the store
    const updatedProductInfo = useProductInfoStore.getState().productInfo;

    const formData = new FormData();
    // for all the productInfo keys, append them to formData
    Object.keys(updatedProductInfo).forEach((key) => {
      formData.append(key, (productInfo as any)[key]);
    });
    // execute(formData);
    nextStep();
  };

  return (
    <>
      <form>
        <InputField
          errors={errors.meta_title?.message}
          field={{ ...register("meta_title") }}
          label="Meta Title"
          type="text"
          placeholder="Enter meta title"
        />
        <InputField
          errors={errors.meta_description?.message}
          field={{ ...register("meta_description") }}
          label="Meta Description"
          type="text"
          placeholder="Enter meta description"
        />
        <InputField
          errors={errors.meta_keywords?.message}
          field={{ ...register("meta_keywords") }}
          label="Meta Keywords"
          type="text"
          placeholder="Enter meta keywords"
        />

        <div className="mt-5">
          <label className="text-gray-400 font-semibold text-sm">
            Custom Code
          </label>
        </div>
        <CodeEditor
          language="js"
          placeholder="Custom Code"
          onChange={(evn) => {
            setValue("custom_code", evn.target.value);
          }}
          padding={15}
          style={{
            fontSize: 16,
            backgroundColor: "#f5f5f5",
            color: "#000",
          }}
        />
      </form>
      <FormButtons submitForm={handleSubmit(onSubmit)} />
    </>
  );
}
