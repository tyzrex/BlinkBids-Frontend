import { UserIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export default function UserCard({
  userCount,
  className,
}: {
  userCount: number;
  className?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "bg-white shadow rounded-lg h-auto flex-center",
          className
        )}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 flex-col-center text-center ">
            <UserIcon width={60} height={60} />
            <p className="text-[20px]">Total Users </p>
            <p className="text-[32px] font-semibold text-accent-1">
              {userCount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
