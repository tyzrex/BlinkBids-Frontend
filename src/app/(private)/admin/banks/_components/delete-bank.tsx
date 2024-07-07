"use client";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

import { deleteExistingBank } from "@/api/actions";
import { showErrorToasts } from "@/lib/utils";

export default function DeleteBank({ id }: { id: number }) {
  const handleDelete = async () => {
    toast.warning("Deleting Bank");
    const response = await deleteExistingBank(id);
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
