import { Suspense } from "react";

import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import CircleLoader from "@/app/components/Loaders/CircleLoader";
import ErrorComponent from "@/components/Error";
import { PaginatedResponse } from "@/lib/reusable-types";
import { requestHandler } from "@/services/serverRequest";

import { DataTable } from "../products/_components/datatable";
import { columns } from "./_user-columns";

interface User {
  id: number;
  last_login: string;
  email: string;
  name: string;
  phone: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  provider: string;
  address: string;
  district: string;
  address_description: string;
  is_mod: boolean;
  groups: any[];
  user_permissions: any[];
}

interface UserPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const getAllUsers = async ({ page }: { page: number }) => {
  const session = await getServerSession(options);
  const response = await requestHandler<PaginatedResponse<User>>(
    `cms/user/list/?page=${page}`,
    "GET",
    session
  );
  return response.data;
};

async function UserPageTable({ page }: { page: number }) {
  const [error, users] = await goTry(getAllUsers({ page }));
  if (error) {
    return <ErrorComponent error={"404"} message="No Users Found" />;
  }

  if (!users) {
    return <ErrorComponent error={"404"} message="No Users Found" />;
  }

  return (
    <>
      <h2 className="text-2xl font-bold">Users</h2>

      <DataTable columns={columns} data={users?.results as User[]} />

      <Pagination
        currentPage={page}
        next={users?.next}
        previous={users?.previous}
        total_pages={users?.total_pages}
        path="/admin/users"
      />
    </>
  );
}

export default async function UsersPage({ searchParams }: UserPageProps) {
  const currentPage = searchParams.page;
  const page = parseInt(currentPage as string, 10) || 1;

  return (
    <Suspense fallback={<CircleLoader />}>
      <UserPageTable page={page} />
    </Suspense>
  );
}
