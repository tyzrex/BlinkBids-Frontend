type CampaignData = {
  id: number;
  name: string;
  price: number;
  images: any[];
  slug: string;
};

type TransformedData = {
  id: number;
  name: string;
};

export const campaignDTO = {
  receive: (campaigns: CampaignData[]): TransformedData[] => {
    return campaigns?.map(({ id, name }) => ({ id, name }));
  },
};
