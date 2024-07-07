"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { addOfferBanner } from "@/api/actions";
import { zodResolver } from "@hookform/resolvers/zod";

import FileInput from "../../../components/FileInput";
import InputField from "../../../components/Input";

const fileSchema = z.object({
  link: z.string().min(1, "Link is required"),
  image: z.any(),
});

type schemaType = z.infer<typeof fileSchema>;

export default function OfferBanner({
  banner,
  results,
}: {
  banner: "banner1" | "banner2";
  results?: {
    link: string;
    image: string;
    type: string;
  };
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      link: results?.link ?? "",
      image: results?.image ?? "",
    },
  });

  const watchImage = watch();
  const imageValue = getValues("image");

  const onSubmit = async (data: schemaType) => {
    //console.log(data);
    const formData = new FormData();
    formData.append("link", data.link);
    formData.append("images", data.image[0]);
    formData.append("banner_type", banner);
    let response;

    if (banner === "banner1") {
      response = await addOfferBanner(formData);
      if (response === 201) {
        toast.success("Banner Updated Successfully");
      } else {
        //console.log(response);
        toast.error("Something went wrong");
      }
    }
    // const response = await addOfferBanner(formData);
    if (banner === "banner2") {
      response = await addOfferBanner(formData);
      if (response === 201) {
        toast.success("Banner Updated Successfully");
      } else {
        //console.log(response);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-5 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-semibold">Offer Banner</h1>

        <FileInput
          register={register}
          registerName="image"
          errors={errors.image?.message}
          label="Image"
          watch={watchImage}
          imageValue={imageValue}
          existingImage={results?.image}
          imagePaths={`/api/banners`}
        />

        <InputField
          placeholder="Link"
          type="text"
          field={{ ...register("link") }}
          errors={errors.link?.message}
          label="Link"
        />
        <button role="button" type="submit" className="accent-button">
          Update Offer Banner One
        </button>
      </form>
    </>
  );
}
