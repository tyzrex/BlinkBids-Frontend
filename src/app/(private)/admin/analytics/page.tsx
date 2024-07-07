import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";
import { LineChart } from "@/components/ui/line-chart";
import { requestHandler } from "@/services/serverRequest";

import { DateFilterComponent } from "./_date-filter,";
import { Suspense } from "react";

interface SalesData {
  date: string;
  items_ordered: number;
  items_delivered: number;
  emi_requests: number;
  total_income: number;
}

const salesDataDto = (data: SalesData[]) => {
  // Map the data to get income chart data
  const getIncomeChart = () => {
    return [
      {
        id: "Total Income",
        data: data.map((item) => ({ x: item.date, y: item.total_income })),
      },
    ];
  };

  // Map the data to get order details
  const getOrderDetails = () => {
    return [
      {
        id: "Items Ordered",
        data: data.map((item) => ({ x: item.date, y: item.items_ordered })),
      },
      {
        id: "Items Delivered",
        data: data.map((item) => ({ x: item.date, y: item.items_delivered })),
      },
      {
        id: "EMI Requests",
        data: data.map((item) => ({ x: item.date, y: item.emi_requests })),
      },
    ];
  };
  // Return the mapping functions to be accessible outside
  return { getIncomeChart, getOrderDetails };
};

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams?: {
    to?: string;
    from?: string;
  };
}) {
  const session = await getServerSession(options);
  const queryParam =
    searchParams?.from && searchParams?.to
      ? `?start_date=${searchParams?.from}&end_date=${searchParams?.to}`
      : "";

  if (
    new Date(searchParams?.from ?? "") > new Date(searchParams?.to ?? "") ||
    new Date(searchParams?.to ?? "") > new Date()
  ) {
    return (
      <ErrorComponent
        error={"Invalid date range"}
        message="Start date cannot be greater than the end date"
      />
    );
  }

  const [error, sales] = await goTry(
    requestHandler<SalesData[]>(`cms/sales${queryParam}`, "GET", session)
  );

  if (!sales || error) {
    return (
      <ErrorComponent error={error} message="Failed to fetch sales data" />
    );
  }

  if (!sales.data) return null;

  const { getIncomeChart, getOrderDetails } = salesDataDto(sales.data);
  const incomeChart = getIncomeChart();
  const orderDetails = getOrderDetails();

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow flex-between w-full mb-5">
        <h2 className="font-semibold my-5 title-typography">Sales Analytics</h2>

        <Suspense fallback={<div>Loading...</div>}>
          <DateFilterComponent className="flex-center gap-5" />
        </Suspense>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Sales & Income Graph:</h2>
        <LineChart className="w-full h-[300px]" data={incomeChart} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow mt-4">
        <h2 className="text-lg font-semibold mb-4">Order Details:</h2>
        <LineChart className="w-full h-[300px]" data={orderDetails} />
      </div>
    </>
  );
}
