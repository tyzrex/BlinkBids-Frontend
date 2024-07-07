import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requestHandler } from "@/services/serverRequest";
import {
  ArrowUpRightIcon,
  CoinsIcon,
  ListOrdered,
  PiggyBank,
  UserCog,
  UserIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { GenericEmptyCard } from "../components/dynamic-empty-card";

interface DashboardData {
  pending_emis: any[];
  pending_emis_count: number;
  approved_emis: any[];
  approved_emis_count: number;
  pending_orders: Pendingorder[];
  pending_orders_count: number;
  recent_blogs: any[];
  ongoing_campaigns: any[];
  total_users: number;
  total_moderators: number;
}

interface Pendingorder {
  pub_id: string;
  user__name: string;
  amount: number;
  product__name: string[];
}

async function getDashboardData(session: any) {
  const dashboardData = await requestHandler<DashboardData>(
    "cms/dashboard/",
    "GET",
    session
  );

  return dashboardData?.data;
}

export default async function AdminDashboard() {
  const session = await getServerSession(options);
  const [error, dashboardData] = await goTry(getDashboardData(session));

  if (error || !dashboardData) {
    return <></>;
  }

  const cardStats = [
    {
      title: "Total Users",
      data: dashboardData.total_users,
      icon: <UserIcon size={20} />,
    },
    {
      title: "Total Moderators",
      data: dashboardData.total_moderators,
      icon: <UserCog size={20} />,
    },
    {
      title: "Pending Orders",
      data: dashboardData.pending_orders_count,
      icon: <ListOrdered size={20} />,
    },
    {
      title: "Pending EMI Requests",
      data: dashboardData.pending_emis_count,
      icon: <CoinsIcon size={20} />,
    },
  ];

  return (
    <>
      <section
        id="main-content"
        className="h-full w-full bg-gray-50 relative overflow-y-auto  dashboard-tables"
      >
        <div>
          <h1 className="text-2xl font-semibold mb-6">FatafatSewa Overview</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 w-full">
              {cardStats.map((card, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="title-typography">
                      {card.title}
                    </CardTitle>
                    {card.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent-1">
                      {card.data}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-5 col-span-3">
              <Card className="bg-white p-4 rounded-lg shadow">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Pending EMI Requests</CardTitle>
                    <CardDescription>
                      Check out the recent emi requests
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="ml-auto gap-1 bg-accent-1"
                  >
                    <Link href="/admin/order-requests" prefetch={false}>
                      View All
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table className="p-0">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer&apos;s Name</TableHead>
                        <TableHead>DownPayment</TableHead>
                        <TableHead>Product Name</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dashboardData.pending_emis_count > 0 ? (
                        dashboardData.pending_emis.map((emi) => (
                          <TableRow key={emi.pub_id}>
                            <TableCell>{emi.pub_id}</TableCell>
                            <TableCell>{emi.user__name}</TableCell>
                            <TableCell>Rs. {emi.downpayment}</TableCell>
                            <TableCell>{emi.product__name}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4}>
                            <GenericEmptyCard
                              title="No Emi Requests at the moment"
                              className="w-full px-0"
                              description="There are no requests check back later"
                            />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="mt-5">
            <Card className="bg-white p-4 rounded-lg shadow">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>Check out the recent orders</CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/admin/order-requests" prefetch={false}>
                    View All
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table className="px-0">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer&apos;s Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Product Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardData.pending_orders_count > 0 ? (
                      dashboardData.pending_orders.map((order) => (
                        <TableRow key={order.pub_id}>
                          <TableCell>{order.pub_id}</TableCell>
                          <TableCell>{order.user__name}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>{order.product__name}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4}>No pending orders</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="bg-white rounded-lg shadow col-span-4 xl:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Recent Blog Articles</CardTitle>
                    <CardDescription>
                      Check out the recent blog articles
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="ml-auto gap-1 bg-accent-1"
                  >
                    <Link href="/admin/blogs" prefetch={false}>
                      View All
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Blog ID</TableHead>
                        <TableHead>Blog Name</TableHead>
                        <TableHead>Author</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dashboardData.recent_blogs.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell>{blog.id}</TableCell>
                          <TableCell>{blog.title}</TableCell>
                          <TableCell>{blog.author}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-4 xl:col-span-2 bg-white rounded-lg shadow">
              <div className="grid col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                      <CardTitle>Campaign</CardTitle>
                      <CardDescription>
                        Check out all the running campaigns
                      </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1 ">
                      <Link href="/admin/campaigns" prefetch={false}>
                        View All
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign Name</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.ongoing_campaigns.map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell>{campaign.name}</TableCell>
                            <TableCell>{campaign.start_date}</TableCell>
                            <TableCell>{campaign.end_date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <Card className=" bg-white p-4 rounded-lg shadow mt-5">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Accepted EMI Requests</CardTitle>
                <CardDescription>
                  Check out all the accepted emi requests
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1 bg-accent-1">
                <Link href="/admin/emi-requests" prefetch={false}>
                  View All
                  <ArrowUpRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer&apos;s Name</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Contact No.</TableHead>
                    <TableHead>Product Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData.approved_emis_count > 0 ? (
                    dashboardData.approved_emis.map((emi) => (
                      <TableRow key={emi.pub_id}>
                        <TableCell>{emi.pub_id}</TableCell>
                        <TableCell>{emi.user__name}</TableCell>
                        <TableCell>{emi.bank__bank_name}</TableCell>
                        <TableCell>{emi.user__phone}</TableCell>
                        <TableCell>{emi.product__name}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <GenericEmptyCard
                          title="No Accepted Emi Requests at the moment"
                          className="w-full px-0"
                          description="There are no requests check back later"
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
