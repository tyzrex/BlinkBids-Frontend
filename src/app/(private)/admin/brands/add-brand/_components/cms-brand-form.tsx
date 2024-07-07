"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addNewBrand, editExistingBrand } from "@/api/actions";
import { zodResolver } from "@hookform/resolvers/zod";

import FileInput from "../../../components/FileInput";
import InputField from "../../../components/Input";
import { BrandDetail } from "../../../utils/brandTypes";
import { addBrandSchema, addBrandSchemaType } from "../_schema/addBrandSchema";
import { showErrorToasts } from "@/lib/utils";

const DynamicJoEditor = dynamic(() => import("../../../components/joeditor"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false, loading: () => <div>Loading...</div> }
);

export default function CmsBrandForm(props: { brandDetailData?: BrandDetail }) {
  const { brandDetailData } = props;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<addBrandSchemaType>({
    defaultValues: {
      custom_code: brandDetailData?.custom_code ?? "",
      description: brandDetailData?.description ?? "",
      meta_description: brandDetailData?.meta_description ?? "",
      meta_keywords: brandDetailData?.meta_keywords ?? "",
      meta_title: brandDetailData?.meta_title ?? "",
      name: brandDetailData?.name ?? "",
      slug: brandDetailData?.slug ?? "",
      image: brandDetailData?.image ?? "",
    },
    resolver: zodResolver(addBrandSchema),
  });
  //console.log(brandDetailData);
  const router = useRouter();

  const watchFields = watch();
  const onSubmit = async (data: addBrandSchemaType) => {
    //console.log(data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("meta_title", data.meta_title);
    formData.append("meta_description", data.meta_description);
    formData.append("meta_keywords", data.meta_keywords);
    formData.append("custom_code", data.custom_code);
    // formData.append("image", data.image[0]);

    if (data.image[0]) {
      formData.append("images", data.image[0]);
    }
    if (brandDetailData) {
      const response = await editExistingBrand(brandDetailData.id, formData);
      //console.log(response);
      if (response.success === true) {
        router.replace("/admin/brands");
        toast.success(response.message);
      } else {
        // toast.error("Something went wrong");
        showErrorToasts(response.errorData);
      }
    } else {
      const response = await addNewBrand(formData);
      if (response.success === true) {
        router.replace("/admin/brands");
        toast.success(response.message);
      } else {
        showErrorToasts(response.errorData);
      }
    }
  };

  const imageValue = getValues("image");

  return (
    <>
      <section className="p-5 bg-white rounded-lg">
        <h1 className="title-typography">Add Brand</h1>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Brand Name"
            field={register("name")}
            placeholder="Enter brand name"
            errors={errors.name?.message}
            type="text"
          />

          <div className="mt-5">
            <label className="text-gray-400 font-semibold text-sm">
              Brand Description
            </label>
            <DynamicJoEditor
              value={props.brandDetailData?.description ?? ""}
              placeholder="Enter brand description"
              registerName="description"
              setValue={setValue}
            />
          </div>

          <InputField
            label="Meta Title"
            field={register("meta_title")}
            placeholder="Enter meta title"
            errors={errors.meta_title?.message}
            type="text"
          />

          <InputField
            label="Slug"
            field={register("slug")}
            placeholder="Enter slug"
            errors={errors.slug?.message}
            type="text"
          />

          <InputField
            label="Meta Description"
            field={register("meta_description")}
            placeholder="Enter meta description"
            errors={errors.meta_description?.message}
            type="text"
          />

          <InputField
            label="Meta Keywords"
            field={register("meta_keywords")}
            placeholder="Enter meta keywords"
            errors={errors.meta_keywords?.message}
            type="text"
          />

          <div className="mt-5">
            <label className="text-gray-400 font-semibold text-sm">
              Custom Code
            </label>
            <CodeEditor
              value={watchFields.custom_code}
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
          </div>

          <FileInput
            errors={errors.image?.message}
            label="Brand Image"
            register={register}
            registerName="image"
            watch={watchFields}
            existingImage={brandDetailData?.image ?? ""}
            imageValue={imageValue}
            imagePaths={`/api/images`}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="login-button mt-5"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <span
                  className="animate-spin inline-block w-3 h-3 border-[3px] border-current border-t-transparent text-white rounded-full mr-2"
                  role="status"
                  aria-label="loading"
                ></span>{" "}
                Submitting...
              </div>
            ) : (
              <span>
                {props.brandDetailData ? "Update Brand" : "Add Brand"}
              </span>
            )}
          </button>
        </form>
      </section>
    </>
  );
}
