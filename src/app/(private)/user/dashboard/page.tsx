import { format } from "date-fns";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";

import { getUserInfo, getUserOrders } from "@/api/user";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requestHandler } from "@/services/serverRequest";

import OrderStatusBadge from "../_components/order-status";

async function getUserDashboardData(session: Session | null) {
  const res = await requestHandler("user/dashboard", "GET", session);
  return res.data as any;
}

export default async function Component() {
  const session = await getServerSession(options);
  const [data, userInfo, orders] = await Promise.all([
    getUserDashboardData(session),
    getUserInfo(session),
    getUserOrders(session, 1),
  ]);

  return (
    <div className="grid h-auto w-full overflow-hidden gap-4 mt-10">
      <h1 className="page-title-typography">Welcome back, {userInfo.name}</h1>
      <div className="grid gap-4 md:grid-cols-4 mt-5">
        <Card className="col-span-4 xl:col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {orders.results.length > 0 ? (
              orders.results.splice(0, 5).map((order: any) => (
                <div
                  key={order.id}
                  className="grid grid-cols-3 gap-2 border-b border-b-gray-300"
                >
                  <div className="font-sm md:font-medium">#{order.pub_id}</div>
                  <div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(order.time_ordered), "dd-MM-yyyy,hh:mm")}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="text-center text-lg font-bold">
                  No orders found
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-4 xl:col-span-1">
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="font-medium">Name: {userInfo.name}</div>
              <div>Address: {userInfo.address}</div>
              <div>Phone: {userInfo.phone}</div>
              <div>Email: {userInfo.email}</div>
              <div>District: {userInfo.district}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/user/profile" prefetch={false}>
              <Button variant="outline">Edit</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-b-8 border-b-green-500">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-medium">Total Orders: {data.total_orders}</div>
          </CardContent>
        </Card>
        <Card className="border-b-8 border-b-blue-500">
          <CardHeader>
            <CardTitle>Total EMI Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-medium">
              Total Orders: {data.total_emi_requests}
            </div>
          </CardContent>
        </Card>
        <Card className="border-b-8 border-b-yellow-500">
          <CardHeader>
            <CardTitle>Pending EMI Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-medium">
              EMI Requests:
              {data.pending_emi_requests}
            </div>
          </CardContent>
        </Card>
        <Card className="border-b-8 border-b-orange-500">
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-medium">
              Total Pending Orders: {data.pending_orders}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
