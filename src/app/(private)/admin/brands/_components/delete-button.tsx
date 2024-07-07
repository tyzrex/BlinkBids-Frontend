"use client";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

import { deleteExistingBrand } from "@/api/actions";
import { showErrorToasts } from "@/lib/utils";

export default function DeleteBrand({ id }: { id: number }) {
  const handleDelete = async () => {
    toast.warning("Deleting Brand");
    const response = await deleteExistingBrand(id);
    if (response.success === true) {
      toast.success("Brand Deleted Successfully");
    } else {
      showErrorToasts(response.errorData);
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="p-2 bg-red-500 text-white rounded-full"
      >
        <AiOutlineDelete />
      </button>
    </>
  );
}
