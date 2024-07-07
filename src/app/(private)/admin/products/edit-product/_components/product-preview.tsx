import { useFormContext } from "react-hook-form";
import { productSchemaType } from "../../_schema/product-schema";
import { UploadedFilesCard } from "../../../components/uploaded-files";
import { useEffect, useState } from "react";
import { isFileWithPreview } from "../../../components/file-uploader";
import { Badge } from "@/components/ui/badge";

export default function ProductPreview() {
  const { getValues } = useFormContext<productSchemaType>();
  // const [description, setDescription] = useState<boolean>(false);
  const values = getValues();

  const previousImages = values.images
    ? values.images.map((image, index) => ({
        key: crypto.randomUUID(),
        name: image,
        url: `/api/images/${image}`,
      }))
    : [];

  // Handle new images
  const newImages = values.new_images
    ? values.new_images.map((image: any) => ({
        key: crypto.randomUUID(),
        name: image.name, // Assuming the image object has a name property
        url: URL.createObjectURL(image), // Create object URL for new images
      }))
    : [];

  // // Revoke preview url when component unmounts
  useEffect(() => {
    return () => {
      if (!newImages) return;
      newImages.forEach((file: any) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full  mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-8">
          <div className="grid gap-2">
            <h1 className="text-3xl md:text-4xl font-bold">{values.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 dark:text-gray-400">
                SKU: {values.sku}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Category:{" "}
                <Badge className="bg-accent-2">{values.category}</Badge>
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Campaign:{" "}
                <Badge className="bg-accent-1">{values.campaign}</Badge>
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Brand: <Badge className="bg-emerald-500">{values.brand}</Badge>
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Price:
                    </span>
                    <span className="text-2xl font-bold">
                      Rs. {values.price}
                    </span>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Discounted Price:
                    </span>
                    <span className="text-2xl font-bold">
                      Rs. {values.discounted_price}
                    </span>
                  </div>

                  <div className="grid gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Custom Code:
                    </span>
                    <span>ACME-WH-001</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-3">
              <div className="space-y-5">
                <h2 className="text-2xl font-bold">Product Images</h2>
                {values.new_images && (
                  <UploadedFilesCard
                    interfaceTitle="New Images"
                    uploadedFiles={newImages}
                  />
                )}
                {values.images && (
                  <UploadedFilesCard
                    interfaceTitle="Previous Images"
                    uploadedFiles={previousImages}
                  />
                )}
              </div>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <div className="grid gap-4">
                <h2 className="text-2xl font-bold">SEO</h2>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Meta Title:
                    </span>
                    <span>{values.meta_title}</span>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Meta Keywords:
                    </span>
                    <span>{values.meta_keywords}</span>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Meta Description:
                    </span>
                    <span>{values.meta_description}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
