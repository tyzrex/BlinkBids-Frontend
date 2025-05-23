import { redirect } from "next/navigation";

import { PostRequest } from "@/services/httpRequest";

interface IPayment {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page(props: IPayment) {
  const data = props?.searchParams?.data;
  if (data) {
    const response = await PostRequest("products/verify/esewa/", {
      data: data,
    });
    if (response.status === 200) {
      redirect("/");
    }
  }
  return (
    <>
      <div className="h-[80vh] w-full">
        <div className="h-full w-full flex-col-center">
          {/* loading animation0 */}
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 mb-10 border-gray-900"></div>

          <div>
            <span className="text-2xl font-bold text-center">
              Your payment is being processed. Please wait...
            </span>
            <p className="text-center text-gray-500">
              You will be redirected to order details page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
