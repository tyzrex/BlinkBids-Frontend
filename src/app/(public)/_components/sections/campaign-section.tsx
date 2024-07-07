import { goTry } from "go-go-try";
import CampaignSwiper from "../Swipers/campaign-swiper";
import { getHomepageCampaign } from "@/api/campaign";

export async function CampaignsSection() {
  const [error, activeCampaigns] = await goTry(getHomepageCampaign());
  if (error || !activeCampaigns || activeCampaigns.count === 0) return null;

  return (
    <>
      <h2 className="title-typography max-w-layout my-10">Active Campaigns</h2>
      <CampaignSwiper data={activeCampaigns.results} />
    </>
  );
}
