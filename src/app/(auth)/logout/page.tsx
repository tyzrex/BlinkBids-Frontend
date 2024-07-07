"use client";
import { useEffect } from "react";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    signOut();
    router.replace("/");
  }, [router]);

  return null;
}
