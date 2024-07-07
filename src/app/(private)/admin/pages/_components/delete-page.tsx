"use client";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

import { deletePageData } from "@/api/actions";
import { showErrorToasts } from "@/lib/utils";

export default function DeletePage({ id }: { id: number }) {
  const handleDelete = async () => {
    toast.warning(`Deleting Page with ID: ${id}`);
    const response = await deletePageData(id);
    if (response.success === true) {
      toast.success(response.message);
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
