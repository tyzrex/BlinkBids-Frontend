import { OrderDetailResponse } from "../page";

export default function InvoiceTable({
  customerOrder,
}: {
  customerOrder: OrderDetailResponse;
}) {
  return (
    <div className="p-9 border border-gray-300 rounded-md w-full">
      <h2 className="text-black">Order Information</h2>
      <div className="flex flex-col mx-0 mt-8">
        <table className="min-w-full divide-y divide-slate-500">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm bg-white font-normal text-black sm:pl-6 md:pl-0"
              >
                Description
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm bg-white font-normal text-black sm:table-cell"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-right text-sm bg-white font-normal text-black sm:table-cell"
              >
                Rate
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right bg-white text-sm font-normal text-black sm:pr-6 md:pr-0"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {customerOrder?.products?.map((product) => {
              return (
                <tr className="border-b border-slate-200" key={product.id}>
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="font-medium text-black">{product.name}</div>
                    <div className="mt-0.5 text-gray-700 sm:hidden">
                      {product.quantity} items x {product.price}
                    </div>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-gray-700 sm:table-cell">
                    {product.quantity}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-gray-700 sm:table-cell">
                    {product.price}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-sm text-right text-gray-700 sm:pr-6 md:pr-0">
                    Rs. {product.price}
                  </td>
                </tr>
              );
            })}
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
                Rs. {customerOrder.price}
              </td>
            </tr>

            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pt-4 pl-6 pr-3  bg-white font-light text-right text-gray-700 sm:table-cell md:pl-0"
              >
                Shipping
              </th>
              <th
                scope="row"
                className="pt-4 pl-4 pr-3  bg-white font-light text-left text-gray-700 sm:hidden"
              >
                Shipping
              </th>
              <td className="pt-4 pl-3 pr-4  bg-white text-right text-gray-700 sm:pr-6 md:pr-0">
                Rs. 0.00
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                colSpan={3}
                className="hidden pt-4 pl-6 pr-3  bg-white font-normal text-right text-black sm:table-cell md:pl-0"
              >
                Total
              </th>
              <th
                scope="row"
                className="pt-4 pl-4 pr-3  bg-white font-normal text-left text-black sm:hidden"
              >
                Total
              </th>
              <td className="pt-4 pl-3 pr-4  bg-white font-normal text-right text-black sm:pr-6 md:pr-0">
                Rs. {customerOrder.price}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
