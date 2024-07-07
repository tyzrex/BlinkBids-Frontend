import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { addNewProduct } from "@/api/actions";
import { useProductInfoStore } from "@/store/products/ProductInfo";

import FilePreview from "./FilePreview";
import FormButtons from "./Steppers";
import { showErrorToasts } from "@/lib/utils";
import { isFileWithPreview } from "../../../components/file-uploader";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FileCard } from "../../../components/file-card";

export default function Summary() {
  const { productInfo, campaigns } = useProductInfoStore((state) => state);
  const router = useRouter();

  const handleSubmit = async () => {
    const formData = new FormData();
    console.log(productInfo);

    formData.append("name", productInfo?.name || "");
    formData.append("sku", productInfo?.sku || "");
    formData.append("short_description", productInfo?.short_description || "");
    formData.append("description", productInfo?.description || "");
    formData.append("category", productInfo?.category || "");
    formData.append("brand", productInfo?.brand || "");
    formData.append("status", productInfo?.status.toString() || "");
    formData.append("price", (productInfo?.price as any) || "");
    formData.append(
      "discounted_price",
      productInfo.discounted_price.toString() || ""
    );
    formData.append(
      "emi_available",
      productInfo?.emi_available.toString() || ""
    );
    formData.append("warranty", productInfo?.warranty || "");
    formData.append("meta_title", productInfo?.meta_title || "");
    formData.append("meta_description", productInfo?.meta_description || "");
    formData.append("meta_keywords", productInfo?.meta_keywords || "");
    formData.append("custom_code", productInfo?.custom_code || "");
    formData.append("highlights", productInfo?.highlights || "");
    formData.append("slug", productInfo?.slug || "");
    formData.append("campaign", productInfo?.campaign?.toString() || "");
    if (productInfo?.images) {
      productInfo.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    if (productInfo?.new_images) {
      productInfo.new_images.forEach((image) => {
        formData.append("new_images", image);
      });
    }
    formData.append("attributes", JSON.stringify(productInfo?.attributes));

    const response = await addNewProduct(formData);
    if (response?.success === true) {
      toast.success(response.message);
      productInfo.new_images.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
      router.push("/admin/products");
    } else {
      showErrorToasts(response.errorData);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="col-span-2 mb-4">
            <h1 className="text-3xl font-bold mb-4">
              Name: {productInfo?.name}
            </h1>
            {productInfo.new_images?.length ? (
              <ScrollArea className="h-fit w-full px-3">
                <div className="max-h-64 space-y-4">
                  {productInfo?.new_images?.map((file, index) => (
                    <FileCard key={index} file={file} />
                  ))}
                </div>
              </ScrollArea>
            ) : null}
          </div>

          {/* Product Details */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <ul className="list-disc ml-4">
              <li>
                <strong>Sku:</strong> {productInfo?.sku}
              </li>
              <li>
                <strong>Short Description:</strong>{" "}
                {productInfo?.short_description}
              </li>
              <li>
                <strong>Category:</strong> {productInfo?.category}
              </li>
              <li>
                <strong>Brand:</strong> {productInfo?.brand}
              </li>
              <li>
                <strong>Status:</strong> {productInfo?.status}
              </li>

              <li>
                <strong>Price:</strong> ${productInfo?.price}
              </li>

              <li>
                <strong>Warranty:</strong> {productInfo?.warranty}
              </li>
            </ul>
          </div>
        </div>
        <div className="my-10 ">
          {productInfo?.attributes &&
            Object.keys(productInfo.attributes).length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-2">Attributes</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(productInfo.attributes).map(
                    ([attribute, value]) => (
                      <div key={attribute} className="border p-2">
                        <div className="font-bold mb-1">{attribute}</div>
                        <div>{value}</div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Meta Information</h3>
            <p>
              <strong>Title:</strong> {productInfo?.meta_title}
            </p>
            <p>
              <strong>Keywords:</strong> {productInfo?.meta_keywords}
            </p>
            <p>
              <strong>Description:</strong> {productInfo?.meta_description}
            </p>
          </div>

          {/* Custom Code */}
          {productInfo?.custom_code && (
            <div>
              <h3 className="text-xl font-bold mb-2">Custom Code</h3>
              <p>{productInfo?.custom_code}</p>
            </div>
          )}
        </div>
        <FormButtons
          submitForm={() => {
            handleSubmit();
          }}
        />
      </div>
    </>
  );
}
