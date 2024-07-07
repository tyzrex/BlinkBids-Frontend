"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";

export default function NProgressTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}
