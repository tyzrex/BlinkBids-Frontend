"use client";

import ProductInfo from "./ProductInfo";
import ImageGallery from "react-image-gallery";

export default function Gallery(props: any) {
  const imageArray: string[] = props?.images.map(
    (image: any) => image.image_url
  );

  const images = imageArray.splice(0, 4).map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className="my-10 flex flex-col justify-center mx-auto w-full lg:flex-row gap-16 lg:items-start">
      <div className="flex flex-col gap-6 lg:w-3/4 rounded-xl items-center">
        <ImageGallery items={images} slideOnThumbnailOver />
      </div>

      <ProductInfo {...props} />
    </div>
  );
}
