"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { requestHandler } from "@/services/serverRequest";
import { useQuery } from "@tanstack/react-query";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const getBrands = async () => {
  const response = await requestHandler(`products/brands/names`, "GET", null);
  return response?.data as any[];
};

export function BrandCombobox() {
  const [open, setOpen] = React.useState<boolean>(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["brand-name"],
    queryFn: () => getBrands(),
    staleTime: 10 * 1000,
  });

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <DropdownMenuLabel
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer"
        >
          BRANDS
        </DropdownMenuLabel>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Command className="w-[300px] md:w-[350px] h-[400px]">
          <CommandInput placeholder="Search brand..." className="px-10" />
          <CommandEmpty>No brand found.</CommandEmpty>
          <CommandGroup className="overflow-y-scroll">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error.message}</div>
            ) : (
              <>
                {data?.map((item: any, index: number) => (
                  <Link
                    href={`/brand/${item.slug}`}
                    prefetch={false}
                    key={index}
                  >
                    <CommandItem>{item.name}</CommandItem>
                  </Link>
                ))}
              </>
            )}
          </CommandGroup>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
