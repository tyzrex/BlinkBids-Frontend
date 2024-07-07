import { Suspense } from "react";

import BannerImagesFetcher from "../_components/banner-images-fetcher";

export default async function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BannerImagesFetcher type="ad" />
      </Suspense>
    </>
  );
}
