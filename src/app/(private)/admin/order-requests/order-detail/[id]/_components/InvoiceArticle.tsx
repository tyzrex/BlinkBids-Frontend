import Image from "next/image";
import FatafatLogo from "@/assets/images/fatafat.png";

interface InvoiceArticleProps {
  customerOrder: any;
}

export default function InvoiceArticle({ customerOrder }: InvoiceArticleProps) {
  return (
    <>
      <article className="overflow-hidden invoice">
        <div className="bg-[white] rounded-b-md">
          <div className="p-9">
            <div className="space-y-6 text=gray-800">
              <Image
                className="object-cover w-[200px] h-full"
                src={FatafatLogo}
                alt="FatafatSewa"
                width={0}
                height={0}
              />

              <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                FatafatSewa Pvt. Ltd.
              </p>
            </div>
          </div>
          <div className="p-9">
            <div className="flex w-full">
              <div className="grid grid-cols-4 gap-16">
                <div className="text-sm font-light text-gray-700">
                  <p className="text-sm font-normal text=gray-800">
                    Invoice Detail:
                  </p>
                  <p>FatafatSewa Pvt. Ltd.</p>
                  <p>Jhamshikhel, Lalitpur</p>
                  <p>01-5555555</p>
                  <p>9841555555</p>
                </div>
                <div className="text-sm font-light text-gray-700">
                  <p className="text-sm font-normal text=gray-800">Billed To</p>
                  <p>Name: {customerOrder.user}</p>
                  <p>Address: {customerOrder.address}</p>
                  <p>
                    Address Description: {customerOrder.address_description}
                  </p>
                  <p>District: {customerOrder.district}</p>
                  <p>Phone: {customerOrder.phone}</p>
                </div>
                <div className="text-sm font-light text-gray-700">
                  <p className="text-sm font-normal text=gray-800">
                    Public Order ID
                  </p>
                  <p>{customerOrder.pub_id}</p>

                  <p className="mt-2 text-sm font-normal text=gray-800">
                    Date of Issue
                  </p>
                  <p>
                    {new Date(customerOrder.time_ordered).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-sm font-light text-gray-700">
                  <p className="text-sm font-normal text=gray-800">Payment</p>
                  <p>
                    {customerOrder.payment_method === "cod"
                      ? "Cash On Delivery"
                      : "Online Payment"}
                  </p>

                  <p className="mt-2 text-sm font-normal text=gray-800">
                    Payment Status
                  </p>
                  <p>
                    {customerOrder.payment_status === true ? "Paid" : "Unpaid"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-9">
            <div className="flex flex-col mx-0 mt-8">
              <table className="min-w-full divide-y divide-slate-500">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm bg-white font-normal text=gray-800 sm:pl-6 md:pl-0"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-right text-sm bg-white font-normal text=gray-800 sm:table-cell"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3.5 px-3 text-right text-sm bg-white font-normal text=gray-800 sm:table-cell"
                    >
                      Rate
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-3 pr-4 text-right bg-white text-sm font-normal text=gray-800 sm:pr-6 md:pr-0"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                      <div className="font-medium text=gray-800">
                        Tesla Truck
                      </div>
                      <div className="mt-0.5 text-gray-700 sm:hidden">
                        {customerOrder.quantity} items x {customerOrder.price}
                      </div>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-right text-gray-700 sm:table-cell">
                      {customerOrder.quantity}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-right text-gray-700 sm:table-cell">
                      {customerOrder.price}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-sm text-right text-gray-700 sm:pr-6 md:pr-0">
                      $0.00
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-6 pl-6 pr-3 bg-white text-sm font-light text-right text-gray-700 sm:table-cell md:pl-0"
                    >
                      Subtotal
                    </th>
                    <th
                      scope="row"
                      className="pt-6 pl-4 pr-3 text-sm bg-white font-light text-left text-gray-700 sm:hidden"
                    >
                      Subtotal
                    </th>
                    <td className="pt-6 pl-3 pr-4 text-sm bg-white text-right text-gray-700 sm:pr-6 md:pr-0">
                      $0.00
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-6 pl-6 pr-3  bg-white font-light text-right text-gray-700 sm:table-cell md:pl-0"
                    >
                      Discount
                    </th>
                    <th
                      scope="row"
                      className="pt-6 pl-4 pr-3  bg-white font-light text-left text-gray-700 sm:hidden"
                    >
                      Discount
                    </th>
                    <td className="pt-6 pl-3 pr-4  bg-white text-right text-gray-700 sm:pr-6 md:pr-0">
                      $0.00
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4 pl-6 pr-3  bg-white font-light text-right text-gray-700 sm:table-cell md:pl-0"
                    >
                      Tax
                    </th>
                    <th
                      scope="row"
                      className="pt-4 pl-4 pr-3  bg-white font-light text-left text-gray-700 sm:hidden"
                    >
                      Tax
                    </th>
                    <td className="pt-4 pl-3 pr-4  bg-white text-right text-gray-700 sm:pr-6 md:pr-0">
                      $0.00
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pt-4 pl-6 pr-3  bg-white font-normal text-right text=gray-800 sm:table-cell md:pl-0"
                    >
                      Total
                    </th>
                    <th
                      scope="row"
                      className="pt-4 pl-4 pr-3  bg-white font-normal text-left text=gray-800 sm:hidden"
                    >
                      Total
                    </th>
                    <td className="pt-4 pl-3 pr-4  bg-white font-normal text-right text=gray-800 sm:pr-6 md:pr-0">
                      $0.00
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
