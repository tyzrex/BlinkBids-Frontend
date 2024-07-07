import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import { getEmiDetail } from "@/api/cms";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageViewer from "./_components/image-viewer";
import EMIStatusToggle from "./_components/emi-status-toggle";
import EMIStatusBadge from "./_components/emi-status";

type Props = {
  params: {
    id: string;
  };
};

export default async function EMIInvoice({ params }: Props) {
  const emiDetailId = parseInt(params.id);
  const session = await getServerSession(options);
  const [error, emiDetail] = await goTry(getEmiDetail(session, emiDetailId));
  if (error || !emiDetail) return <div>error</div>;

  const customerOrder = emiDetail;
  //district is not coming so null , inform backend
  //extract the documents and split the names into array

  const documents: { [key: string]: any } = {
    citizenship_copy: customerOrder.citizenship_copy,
    salary_certificate: customerOrder.salary_certificate,
    bank_statement: customerOrder.bank_statement,
    passport_photo: customerOrder.passport_photo,
  };

  const paths: { [key: string]: any } = !customerOrder.has_credit_card
    ? Object.keys(documents).reduce((acc, key) => {
        const url = new URL(documents[key]);
        const path = url.pathname.split("/").slice(2).join("/");
        return { ...acc, [key]: path };
      }, {} as { [key: string]: any })
    : {};

  return (
    <>
      <div className="flex-between">
        <div className="py-5">
          <h1 className="title-typography">Order Invoice</h1>
        </div>

        <Link href="/admin/emi-requests" prefetch={false}>
          <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-accent-2 rounded-md hover:bg-gray-700 focus:outline-none ">
            Back to All EMI Requests
          </button>
        </Link>
      </div>
      <div className="mx-auto py-16 bg-white">
        <article className="overflow-hidden">
          <div className="bg-[white] rounded-b-md">
            <div className="flex justify-between items-start px-9">
              <div className="mb-10">
                <div className="flex flex-col items-start">
                  <h2 className="text-black">EMI ID: {params.id}</h2>
                  <h6 className="text-sm font-bold text-black">
                    Public Order ID: {customerOrder.pub_id}
                  </h6>
                  <h6 className="text-sm font-bold text-black">
                    EMI Request Date:{" "}
                    {new Date(customerOrder.created_at).toDateString()}
                  </h6>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <p className="text-sm font-normal text-black mr-3">
                        Status:
                      </p>
                      <EMIStatusBadge status={customerOrder.status} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 ">
                <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-accent-1 rounded-md hover:bg-gray-700 focus:outline-none ">
                  Download Invoice
                </button>
                <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-accent-2 rounded-md hover:bg-gray-700 focus:outline-none ">
                  Print Invoice
                </button>
              </div>
            </div>

            <div className="grid lg:grid-flow-row grid-cols-4 px-9 gap-10">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>EMI Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-normal text-black mr-3">
                      Change EMI Status:
                    </p>

                    <EMIStatusToggle
                      id={customerOrder.id}
                      currentStatus={customerOrder.status}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 xl:col-span-2">
                <CardHeader>
                  <CardTitle>EMI Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-medium">
                      Product Name: {customerOrder.product}
                    </div>
                    <div>Down Payment: {customerOrder.downpayment}</div>
                    <div>Financed Amount: {customerOrder.finance_amount}</div>
                    <div>Term of EMI: {customerOrder.emi_duration}</div>
                    <div>Bank: {customerOrder.bank}</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-4 xl:col-span-2">
                <CardHeader>
                  <CardTitle>
                    Credit Card Status:{" "}
                    {customerOrder.has_credit_card ? "Yes" : "No"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {customerOrder.has_credit_card === false && (
                    <>
                      <div>
                        <div className="font-medium">
                          No of dependents: {customerOrder.num_dependents}
                        </div>
                        <div>
                          Monthly Income: {customerOrder.monthly_income}
                        </div>
                        <div>Occupation: {customerOrder.occupation}</div>
                        <div>
                          Residential Status: {customerOrder.residential_status}
                        </div>
                        <div>
                          Employment Length: {customerOrder.employment_length}
                        </div>
                      </div>
                    </>
                  )}

                  {customerOrder.has_credit_card && (
                    <>
                      <p>Card Number: {customerOrder.credit_card_number}</p>
                      <p>Card Holder: {customerOrder.credit_card_name}</p>
                      <p>Card Expiry: {customerOrder.credit_card_expiration}</p>
                      <p>Card Limit: {customerOrder.credit_card_limit}</p>
                    </>
                  )}
                </CardContent>
              </Card>
              <Card className="col-span-4 xl:col-span-2">
                <CardHeader>
                  <CardTitle>Customer Detail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-medium">
                      Name: {customerOrder.full_name}
                    </div>
                    <div>Address: {customerOrder.address}</div>
                    <div>Phone: {customerOrder.contact_number}</div>
                    <div>Email: {customerOrder.email}</div>
                    <div>District: {customerOrder.district}</div>
                  </div>
                </CardContent>
              </Card>

              {!customerOrder.has_credit_card && (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-black">
                      Documents Uploaded
                    </h3>
                  </div>
                  <div className="col-span-4 flex justify-between items-start">
                    <ImageViewer
                      bank_statement={paths.bank_statement}
                      salary_certificate={paths.salary_certificate}
                      citizenship_copy={paths.citizenship_copy}
                      passport_photo={paths.passport_photo}
                    />
                    <div className="flex flex-col col-span-3 space-y-4 items-start gap-2 text-sm">
                      <div className="grid grid-cols-2 gap-5">
                        <div className="flex-col space-y-4">
                          <Image
                            className="aspect-square h-[200px] w-[200px]"
                            src={`/api/${paths?.salary_certificate}`}
                            alt="FatafatSewa"
                            width={200}
                            height={200}
                          />
                          <p>Salary Certificate</p>
                        </div>
                        <div className="flex-col space-y-4">
                          <Image
                            className="aspect-square h-[200px] w-[200px]"
                            src={`/api/${paths?.citizenship_copy}`}
                            alt="FatafatSewa"
                            width={200}
                            height={200}
                          />
                          <p>Citizenship Copy</p>
                        </div>

                        <div className="flex-col space-y-4">
                          <Image
                            className="aspect-square h-[200px] w-[200px]"
                            src={`/api/${paths?.bank_statement}`}
                            alt="FatafatSewa"
                            width={200}
                            height={200}
                          />
                          <p>Bank Statement</p>
                        </div>

                        <div className="flex-col space-y-4">
                          <Image
                            className="aspect-square h-[200px] w-[200px]"
                            src={`/api/${paths?.passport_photo}`}
                            alt="FatafatSewa"
                            width={200}
                            height={200}
                          />
                          <p>Passport Photo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
