import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { getAllCampaigns } from "@/api/cms";
import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";

import { DataTable } from "../products/_components/datatable";
import { columns } from "./_components/columns";

type CampaignsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CampaignsPage(props: CampaignsPageProps) {
  const session = await getServerSession(options);
  const currentPage = parseInt(props?.searchParams?.page as string) || 1;
  const [error, campaigns] = await goTry(
    getAllCampaigns({
      session,
      currentPage,
    })
  );
  if (error || !campaigns) {
    return (
      <ErrorComponent error={"404"} message={"Failed Fetching Campaigns"} />
    );
  }

  return (
    <>
      <div className="py-10 w-full">
        <h3 className="title-typography">Campaigns</h3>

        <div className="w-full">
          <DataTable
            columns={columns}
            data={campaigns?.results}
            addPage="/campaigns/add-campaign"
            navigator={true}
            searchColumn="name"
            goToLink="Add Campaign"
          />

          <Pagination
            currentPage={currentPage}
            total_pages={campaigns?.total_pages}
            next={campaigns?.next}
            previous={campaigns?.previous}
            path="/admin/campaigns"
          />
        </div>
      </div>
    </>
  );
}
