import { cn } from "@/lib/utils";

import { DataTable } from "../../products/_components/datatable";

export default async function DashboardTable({
  columns,
  results,
  className,
  tableName,
}: {
  columns: any;
  results: any;
  className?: string;
  tableName?: string;
}) {
  return (
    <>
      <div className={cn(className, "table-container")}>
        <div>
          <p className="text-xl px-5 font-semibold -mb-8 mt-3 text-left">
            {tableName}
          </p>
        </div>

        <DataTable columns={columns} data={results} />
      </div>
    </>
  );
}
