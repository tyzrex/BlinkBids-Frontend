"use client";

import { getInitials } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function UserSession() {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="flex items-center p-2 space-x-4">
        {status === "loading" ? (
          <div className="flex items-center justify-center mt-4">
            <svg
              className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div className="flex flex-col gap-2">
              <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
              <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full dark:bg-gray-500">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex-center">
                {getInitials(session?.user?.name)}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{session?.user?.name}</h2>
              <span className="flex items-center space-x-1">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  View profile
                </a>
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
