"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { BrandDetail } from "../../utils/brandTypes";
import InputField from "../../components/Input";

import { PagesSchema, PagesSchemaType } from "@/schema/cms/pages-schema";
import { addNewPageData, editPageData } from "@/api/actions";
import { showErrorToasts } from "@/lib/utils";

const DynamicJoEditor = dynamic(() => import("../../components/joeditor"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function PagesForm(props: {
  pageDetailData?: any;
  id?: number;
  formType: "edit" | "add";
}) {
  const { pageDetailData } = props;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<PagesSchemaType>({
    defaultValues: {
      name: pageDetailData?.name ?? "",
      content: pageDetailData?.content ?? "",
    },
    resolver: zodResolver(PagesSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: PagesSchemaType) => {
    //console.log(data);

    if (props.formType === "edit" && props.id) {
      console.log(props.id);
      const response = await editPageData(data, props.id);
      //console.log(response);
      if (response.success === true) {
        router.replace("/admin/pages");
        toast.success(response.message);
      } else {
        showErrorToasts(response.errorData);
      }
    } else {
      try {
        const response = await addNewPageData(data);
        if (response.status === 201 && response.success) {
          router.replace("/admin/pages");
          toast.success(response.message);
        }
      } catch (err: any) {
        const errorMessages = err.message.split(",");
        errorMessages.forEach((message: string) => {
          toast.error(message);
        });
      }
    }
  };

  return (
    <>
      <section className="p-5 bg-white rounded-lg">
        <h1 className="title-typography">
          {props.pageDetailData ? "Edit Page Data" : "Add Page Data"}
        </h1>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Pages Name"
            field={register("name")}
            placeholder="Enter Pages name"
            errors={errors.name?.message}
            type="text"
          />

          <div className="mt-5">
            <label className="text-gray-400 font-semibold text-sm">
              Pages content
            </label>
            <DynamicJoEditor
              value={props.pageDetailData?.content ?? ""}
              placeholder="Enter page content"
              registerName="content"
              setValue={setValue}
            />
          </div>

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
                {props.pageDetailData
                  ? "Update Page content"
                  : "Add Page content"}
              </span>
            )}
          </button>
        </form>
      </section>
    </>
  );
}
