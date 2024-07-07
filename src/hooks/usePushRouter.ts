"use client";

import { useRouter } from "next/navigation";
import NProgress from "nprogress";

export default function usePushRouter() {
  const router = useRouter();

  const { push } = router;

  router.push = (href, options) => {
    NProgress.start();

    push(href, options);
  };

  return router;
}
