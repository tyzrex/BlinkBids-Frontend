"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addBlogCategory, editBlogCategory } from "@/api/actions";
import { showErrorToasts } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import { addBlogSchema, addBlogSchemaType } from "../_schema/addBlogSchema";

const LazyJoEditor = dynamic(() => import("../../../components/joeditor"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function AddBlogCategoryForm({
  blogCategoryDetail,
  formType,
  id,
}: {
  blogCategoryDetail?: any;
  formType: "edit" | "create";
  id?: number;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<addBlogSchemaType>({
    defaultValues: {
      title: blogCategoryDetail?.title || "",
      short_desc: blogCategoryDetail?.short_desc || "",
      meta_title: blogCategoryDetail?.meta_title || "",
      meta_description: blogCategoryDetail?.meta_description || "",
      meta_keywords: blogCategoryDetail?.meta_keywords || "",
      content: blogCategoryDetail?.content || "",
      slug: blogCategoryDetail?.slug || "",
      status: blogCategoryDetail?.status || true,
    },
    resolver: zodResolver(addBlogSchema),
  });

  const onSubmit = async (data: addBlogSchemaType) => {
    //console.log(data);
    if (formType === "create") {
      const response = await addBlogCategory(data);
      if (response.success === true) {
        toast.success(response.message);
        router.replace("/admin/blogs-categories");
      } else {
        showErrorToasts(response.errorData);
      }
    }
    if (formType === "edit") {
      if (!id) {
        return;
      }
      const response = await editBlogCategory(data, id);
      if (response.success === true) {
        toast.success(response.message);
        router.replace("/admin/blogs-categories");
      } else {
        showErrorToasts(response.errorData);
      }
    }
  };

  return (
    <>
      <section className="p-5 bg-white rounded-lg">
        <h1 className="title-typography">
          {formType === "create" ? "Add" : "Edit"} Blog Category
        </h1>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Title"
            field={register("title")}
            placeholder="Enter Blog title"
            errors={errors.title?.message}
            type="text"
          />

          <InputField
            label="Slug"
            field={register("slug")}
            placeholder="Enter slug"
            errors={errors.slug?.message}
            type="text"
          />

          <div className="mt-5">
            <label className="text-gray-400 font-semibold text-sm">
              Content
            </label>
            <LazyJoEditor
              value={blogCategoryDetail?.content}
              placeholder="Enter brand description"
              registerName="content"
              setValue={setValue}
            />
          </div>

          <TextArea
            label="Short Description"
            field={register("short_desc")}
            placeholder="Enter short description"
            errors={errors.short_desc?.message}
            type="text"
          />

          <InputField
            label="Meta Title"
            field={register("meta_title")}
            placeholder="Enter meta title"
            errors={errors.meta_title?.message}
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

          <button className="login-button mt-5" type="submit">
            Add Blog Category
          </button>
        </form>
      </section>
    </>
  );
}
