import CircleLoader from "@/components/ui/CircleLoader";
import { Suspense } from "react";
import EMITable from "./_components/emi-table";

interface IEmiPage {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page(props: IEmiPage) {
  const currentPage = props?.searchParams?.page;
  return (
    <>
      <Suspense fallback={<CircleLoader />}>
        <EMITable currentPage={currentPage} />
      </Suspense>
    </>
  );
}
