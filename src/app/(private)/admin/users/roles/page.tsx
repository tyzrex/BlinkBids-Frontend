import { goTry } from "go-go-try";
import { getServerSession } from "next-auth";

import Pagination from "@/app/(public)/search/components/pagination";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ErrorComponent from "@/components/Error";
import { PaginatedResponse } from "@/lib/reusable-types";
import { requestHandler } from "@/services/serverRequest";

import { DataTable } from "../../products/_components/datatable";
import { userRoleColumns } from "./_uesr-roles-columns";

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

const getAllUsers = async (page: number) => {
  const session = await getServerSession(options);
  const response = await requestHandler<PaginatedResponse<User>>(
    `cms/user/list/?page=${page}`,
    "GET",
    session
  );
  return response.data;
};

interface UserRoleProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function UsersPage(props: UserRoleProps) {
  const currentPage = parseInt(props.searchParams.page as string) || 1;
  const [error, users] = await goTry(getAllUsers(currentPage));
  if (error || !users) {
    return <ErrorComponent error={"404"} message="No Users Found" />;
  }

  return (
    <>
      <h2 className="text-2xl font-bold">User Role Management</h2>

      <DataTable
        columns={userRoleColumns}
        data={users?.results}
        addPage="/category/add-category"
        goToLink="Add Category"
        navigator={true}
        searchColumn="name"
      />

      <Pagination
        currentPage={currentPage}
        total_pages={users.total_pages}
        next={users.next}
        previous={users.previous}
        path="/admin/users/roles"
      />

      {/* <div className="flex flex-col items-start w-full gap-5 mt-10">
        {users?.results.map((user) => {
          return (
            <div className="bg-white py-5 px-10 w-full" key={user.id}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex-center">
                    {getInitials(user.name)}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold">{user.name}</h3>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <UserSwitch id={user.id} isMod={user.is_mod} />
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </>
  );
}
