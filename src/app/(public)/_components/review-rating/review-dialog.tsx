"use client";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { postProductReview } from "@/api/user-actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showErrorToasts } from "@/lib/utils";
import { ReviewSchema, ReviewSchemaType } from "@/schema/review/review-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { StarIcon } from "./rating-stars";

export function ReviewDialog({ productId }: { productId: number }) {
  const [stars, setStars] = useState([
    { id: 1, checked: false, hovered: false },
    { id: 2, checked: false, hovered: false },
    { id: 3, checked: false, hovered: false },
    { id: 4, checked: false, hovered: false },
    { id: 5, checked: false, hovered: false },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewSchemaType>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      product: productId,
      rating: 0,
      description: "",
    },
  });

  const handleCheck = (id: number) => {
    setValue("rating", id);
    setStars((prev) =>
      prev.map((star) => {
        if (star.id <= id) {
          return { ...star, checked: true };
        }
        return { ...star, checked: false };
      })
    );
  };

  const handleHovered = (id?: number) => {
    setStars((prev) =>
      prev.map((star) => {
        if (id) {
          return star.id <= id ? { ...star, hovered: true } : star;
        }
        return { ...star, hovered: false };
      })
    );
  };

  const resetStars = () => {
    setStars((prev) =>
      prev.map((star) => {
        return { ...star, checked: false, hovered: false };
      })
    );
  };

  const formSubmit = async (data: ReviewSchemaType) => {
    const response = await postProductReview(data);
    if (response.success === true) {
      toast.success(response.message);
      reset();
      //reset stars
      resetStars();
    } else {
      showErrorToasts(response.errorData);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col space-y-4 py-5 w-full"
      >
        <Textarea
          placeholder="What did you think?*"
          rows={6}
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description?.message && (
          <p className="text-sm text-red-500 text-left">
            {errors.description.message}
          </p>
        )}

        <div className="flex items-center">
          {stars.map((star) => (
            <div
              key={star.id}
              className="cursor-pointer text-3xl 2xl:text-4xl"
              onMouseEnter={() => {
                handleHovered(star.id);
              }}
              onMouseLeave={() => {
                handleHovered();
              }}
              onClick={() => {
                handleCheck(star.id);
              }}
            >
              {star.checked || star.hovered ? (
                <StarIcon className="w-5 h-5 stroke-none fill-yellow-500" />
              ) : (
                <StarIcon className="w-5 h-5 fill-muted-foreground stroke-none" />
              )}
            </div>
          ))}
        </div>
        {errors?.rating?.message && (
          <p className="text-sm text-red-500 text-left">
            Please assign a star rating to validate your review.
          </p>
        )}

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
}
