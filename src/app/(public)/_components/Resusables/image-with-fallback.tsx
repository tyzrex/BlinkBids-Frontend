"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
export const ImageWithFallback = ({
  fallback,
  alt,
  src,
  ...props
}: ImageProps & {
  fallback: string;
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <Image
      alt={alt}
      onError={() => {
        setError(true);
        setLoading(false);
      }}
      onLoad={() => setLoading(false)}
      src={error ? fallback : src}
      style={{
        opacity: loading ? 0 : 1,
        transition: "opacity 0.3s",
      }}
      {...props}
    />
  );
};
