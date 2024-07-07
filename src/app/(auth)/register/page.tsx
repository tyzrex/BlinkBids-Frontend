import Image from "next/image";
import Login from "public/assets/loginscreen.webp";

import RegisterForm from "../_components/register-form";

export default async function RegisterPage() {
  return (
    <main>
      <section className="xl:flex-center">
        <div className="max-w-layout flex-center gap-20">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
