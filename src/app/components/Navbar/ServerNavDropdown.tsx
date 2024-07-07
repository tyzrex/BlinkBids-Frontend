import { getServerSession } from 'next-auth';
import Link from 'next/link';

import { options } from '@/app/api/auth/[...nextauth]/options';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import LogOut from './LogOut';

export default async function ServerNavDropdown() {
  const session = await getServerSession(options);
  //console.log(session);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
            <span className="text-gray-700 font-medium text-lg leading-none">
              {session?.user.name?.charAt(0)}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/user/dashboard"}>
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
