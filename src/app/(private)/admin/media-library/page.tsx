import { getUploadedMedia } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";
import ImageUploader from "@/components/image-uploader";
import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";
import { DataTable } from "../products/_components/datatable";
import { mediaLibColumns } from "./_columns";

export default async function MediaPage() {
  const session = await getServerSession(options);
  const [error, data] = await goTry(getUploadedMedia(session, 1));

  if (error || !data) {
    return (
      <ErrorComponent error={"Couldnt Fetch Media"} message="Fetching Failed" />
    );
  }

  return (
    <>
      <h1 className="page-title-typography">Media Library</h1>
      <DataTable
        data={data.results}
        columns={mediaLibColumns}
        navigator
        addPage="media-library/image-uploader"
        goToLink="Add Media"
        searchColumn="name"
      />
    </>
  );
}
