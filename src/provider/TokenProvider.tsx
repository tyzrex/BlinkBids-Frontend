"use client";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const Auth = () => {
  const { data: sessionData } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (sessionData?.user?.accessExpireTime) {
      if (sessionData?.user.accessExpireTime < Date.now() / 1000) {
        signOut();
      }
    }
  }, [sessionData, pathname, searchParams]);

  return null;
};
