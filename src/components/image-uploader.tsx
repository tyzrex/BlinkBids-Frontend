"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { handleMediaUpload } from "@/api/actions";
import { showErrorToasts } from "@/lib/utils";
import { useSession } from "next-auth/react";
import RHFInput from "@/app/(private)/admin/components/rhf-input";
import { Form } from "./ui/form";
import RHFFileInput from "@/app/(private)/admin/components/rhf-fileinput";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.array(z.instanceof(File)),
});

type FormValues = z.infer<typeof schema>;

export default function ImageUploader() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = form;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleImageUpload = async (data: FormValues) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.title);

    const response = await handleMediaUpload(formData);
    if (response.success) {
      toast.success(response.message);
      console.log(response.data);
      setImageUrl(response.data.url); // Assuming response contains the URL
    } else {
      showErrorToasts(response.errorData);
    }
  };

  const copyUrlToClipboard = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
      toast.success("Image URL copied to clipboard");
    }
  };

  return (
    <div className="h-full w-full">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full ">
        <h2 className="text-2xl font-bold mb-4">Image Uploader</h2>
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={handleSubmit(handleImageUpload)}
          >
            <RHFFileInput<FormValues>
              name="image"
              formLabel="Image"
              numberOfFiles={1}
            />
            <RHFInput<FormValues>
              name="title"
              placeHolder="Image Name"
              formLabel="Image Name"
            />
            <Button type="submit" className="w-full">
              Upload Image
            </Button>
          </form>
        </Form>
      </div>

      {imageUrl && (
        <div className="mt-5 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full">
          <h2 className="text-2xl font-bold mb-4">Image URL</h2>
          <div className="flex items-center space-x-2">
            <Input
              value={imageUrl}
              readOnly
              className="w-full"
              placeholder="Image URL"
            />
            <Button onClick={copyUrlToClipboard}>Copy URL</Button>
          </div>
        </div>
      )}
    </div>
  );
}
