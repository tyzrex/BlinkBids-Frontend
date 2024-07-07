"use client";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addNewBlog, editBlog } from "@/api/actions";
import { IblogDetail } from "@/app/(public)/types/blog";
import { showErrorToasts, slugify } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import FileInput from "../../../components/FileInput";
import InputField from "../../../components/Input";
import JoEditor from "../../../components/joeditor";
import SelectField from "../../../components/Select";
import { addBlogSchema, addBlogSchemaType } from "../_schema/addBlogSchema";
import type { IBlogCategoryList } from "../page";
import { useRouter } from "next/navigation";

export default function AddBlogForm({
  blogCategories,
  formType,
  blogDetail,
}: {
  blogCategories: IBlogCategoryList[];
  formType: "create" | "edit";
  blogDetail?: IblogDetail;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<addBlogSchemaType>({
    defaultValues: {
      title: blogDetail?.title || "",
      author: blogDetail?.author || "",
      description: blogDetail?.description || "",
      is_featured: true,
      publish_date: blogDetail?.publish_date || "",
      status: "published",
      meta_description: blogDetail?.meta_description || "",
      meta_keywords: blogDetail?.meta_keywords || "",
      short_desc: blogDetail?.short_desc || "",
      slug: blogDetail?.slug || "",
      meta_title: blogDetail?.meta_title || "",
      image: blogDetail?.thumbnail || "",
    },
    resolver: zodResolver(addBlogSchema),
  });

  const watchFields = watch();

  const onSubmit = async (data: addBlogSchemaType) => {
    //console.log(data);

    const formData = new FormData();
    formData.append("content", data.description);
    formData.append("meta_title", data.meta_title);
    formData.append("meta_description", data.meta_description);
    formData.append("meta_keywords", data.meta_keywords);
    formData.append("status", data.status);
    formData.append("is_featured", data.is_featured.toString());
    formData.append("category", data.category.toString());
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("short_desc", data.short_desc);
    formData.append("slug", data.slug);
    formData.append("publish_date", data.publish_date);
    // formData.append("image", data.image[0]);

    if (data.image[0]) {
      formData.append("thumbnail", data.image[0]);
    }

    if (formType === "create") {
      const response = await addNewBlog(formData);
      if (response.success === true) {
        toast.success(response.message);
        router.replace("/admin/blogs");
      } else {
        showErrorToasts(response.errorData);
      }
    }

    if (formType === "edit") {
      if (blogDetail?.id) {
        const response = await editBlog(formData, blogDetail?.id);
        console.log(response);
        if (response.success === true) {
          toast.success(response.message);
          router.replace("/admin/blogs");
        } else {
          showErrorToasts(response.errorData);
        }
      }
    }
  };

  const imageValue = getValues("image");
  useEffect(() => {
    if (!watchFields.title) {
      return;
    }
    setValue("slug", slugify(watchFields.title));
  }, [watchFields.title]);

  return (
    <>
      <section className="p-5 bg-white rounded-lg">
        <h1 className="title-typography">Add Blog</h1>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Title"
            field={register("title")}
            placeholder="Enter Blog title"
            errors={errors.title?.message}
            type="text"
          />

          <SelectField
            label="Blog Category"
            placeholder="Select Blog Category"
            errors={errors.category?.message}
            field={register("category")}
            type="select"
            options={blogCategories}
          />

          <SelectField
            label="Status"
            placeholder="Select Status"
            errors={errors.status?.message}
            field={register("status")}
            type="select"
            options={[
              { id: "published", title: "Published" },
              { id: "draft", title: "Draft" },
            ]}
          />

          <SelectField
            label="Is Featured"
            placeholder="Select Is Featured"
            errors={errors.is_featured?.message}
            field={register("is_featured")}
            type="select"
            options={[
              { id: true, title: "Yes" },
              { id: false, title: "No" },
            ]}
          />

          <InputField
            label="Author"
            field={register("author")}
            placeholder="Enter Blog Author"
            errors={errors.author?.message}
            type="text"
          />

          <InputField
            label="Short Description"
            field={register("short_desc")}
            placeholder="Enter Enter Short Description"
            errors={errors.short_desc?.message}
            type="text"
          />

          <InputField
            label="Slug"
            field={register("slug")}
            placeholder="Enter Blog Slug"
            errors={errors.slug?.message}
            type="text"
          />

          <InputField
            label="Publish Data"
            field={register("publish_date")}
            placeholder="eg. 2021-09-30"
            errors={errors.publish_date?.message}
            type="date"
          />

          <FileInput
            errors={errors.image?.message}
            label="Blog Thumbnail Image"
            register={register}
            registerName="image"
            watch={watchFields}
            imageValue={imageValue}
            existingImage={blogDetail?.image}
            imagePaths={"/api/images"}
          />

          <div className="mt-5">
            <label className="text-gray-400 font-semibold text-sm">
              Brand Description
            </label>
            <JoEditor
              value={blogDetail?.content || ""}
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
            {formType === "create" ? "Add Blog" : "Update Blog"}
          </button>
        </form>
      </section>
    </>
  );
}
