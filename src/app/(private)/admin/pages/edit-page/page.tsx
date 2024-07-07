import { getPageDetail } from "@/api/homeApi";
import { goTry } from "go-go-try";
import PagesForm from "../_components/pages-form";

interface EditPageProps {
  searchParams: {
    name: string;
    id: number;
  };
}

export default async function EditPage(props: EditPageProps) {
  const [error, pageData] = await goTry(getPageDetail(props.searchParams.name));

  if (error || !pageData) {
    return <></>;
  }

  return (
    <>
      <PagesForm
        pageDetailData={pageData}
        id={props.searchParams.id}
        formType="edit"
      />
    </>
  );
}
