import Image from "next/image";
import Login from "public/assets/loginscreen.webp";

import LoginForm from "../_components/login-form";
import { Suspense } from "react";

// import { getServerSession } from "next-auth";
// import { options } from "@/app/api/auth/[...nextauth]/options";
// import { redirect } from "next/navigation";

export default async function LoginPage() {
  return (
    <main>
      <section className="flex-center max-w-layout">
        <div className="w-full flex-center gap-20">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
