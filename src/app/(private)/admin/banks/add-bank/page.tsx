import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { getBankDetailById } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { EMIBanksForm } from "../_components/bank-add-edit-form";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categoryTypeId = searchParams?.id;

  if (categoryTypeId) {
    const session = await getServerSession(options);
    const [error, response] = await goTry(
      getBankDetailById(session, categoryTypeId)
    );

    if (error || !response) {
      return (
        <ErrorComponent
          message="Error fetching category type"
          error={"404 not found"}
        />
      );
    }

    return (
      <>
        <EMIBanksForm formType="edit" bankType={response} />
      </>
    );
  }
  return (
    <>
      <EMIBanksForm formType="create" />
    </>
  );
}
