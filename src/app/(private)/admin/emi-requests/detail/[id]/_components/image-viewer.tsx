"use client";
import ImageGallery from "react-image-gallery";

export default function ImageViewer({
  salary_certificate,
  citizenship_copy,
  bank_statement,
  passport_photo,
}: {
  salary_certificate: string;
  citizenship_copy: string;
  bank_statement: string;
  passport_photo: string;
}) {
  const images = [
    {
      original: "/api/" + salary_certificate,
      thumbnail: "/api/" + salary_certificate,
    },
    {
      original: "/api/" + citizenship_copy,
      thumbnail: "/api/" + citizenship_copy,
    },
    {
      original: "/api/" + bank_statement,
      thumbnail: "/api/" + bank_statement,
    },
    {
      original: "/api/" + passport_photo,
      thumbnail: "/api/" + passport_photo,
    },
  ];

  return (
    <div className="h-[750px] w-[750px]">
      <ImageGallery items={images} />
    </div>
  );
}
