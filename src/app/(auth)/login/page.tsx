import { LoginPage } from "@/components/login-page";

export default function Page() {
  return (
    <main>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>

            <LoginPage />
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            alt="Image"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            height="1080"
            src="/ecom.jpeg"
            style={{
              aspectRatio: "1920/1080",
              objectFit: "cover",
            }}
            width="1920"
          />
        </div>
      </div>
    </main>
  );
}
