"use client";

import { useState } from "react";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  addPage?: string;
  goToLink?: string;
  navigator?: boolean;
  searchColumn?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  addPage,
  goToLink,
  navigator,
  searchColumn,
}: DataTableProps<TData, TValue>) {
  const [sortingState, setSortingState] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSortingState,
    state: {
      sorting: sortingState,
      columnFilters,
    },
  });

  return (
    <>
      <div className="my-5 flex-between">
        {searchColumn && (
          <Input
            placeholder={`Search by ${searchColumn ?? "name"}`}
            value={
              (table
                .getColumn(searchColumn ?? "name")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(searchColumn ?? "name")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-md py-6"
          />
        )}

        {navigator && (
          <Link href={`/admin/${addPage}`} prefetch={false}>
            <button className="login-button px-5">
              {goToLink ? goToLink : `Add ${addPage?.split("/")[2]}`}
            </button>
          </Link>
        )}
      </div>
      <div className="rounded-md bg-white">
        <Table className="p-6">
          <TableHeader className="p-[10px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
