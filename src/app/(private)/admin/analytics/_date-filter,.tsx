"use client";
import * as React from "react";

import { format, subDays } from "date-fns";
import { CalendarSearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function DateFilterComponent({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const today = new Date();
  const sevenDaysBeforeToday = (date: Date) => subDays(date, 6);
  const router = useRouter();
  // const searchParams = useSearchParams();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: sevenDaysBeforeToday(today),
    to: today,
  });

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    // Reset to the last 7 days including today if today's date is selected
    setDate({
      from: sevenDaysBeforeToday(selectedDate),
      to: selectedDate,
    });
  };

  return (
    <div className={cn("", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarSearchIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            disabled={{ after: today }}
            onSelect={(date: Date | undefined) => handleDateSelect(date)}
          />
        </PopoverContent>
      </Popover>

      <Link
        href={`/admin/analytics?from=${
          date?.from ? format(date.from, "yyyy-MM-dd") : ""
        }&to=${date?.to ? format(date.to, "yyyy-MM-dd") : ""}`}
        prefetch={false}
      >
        <Button variant="default">Apply</Button>
      </Link>

      {/* <Button
        variant="default"
        onClick={() => {
          if (date) {
            const params = new URLSearchParams(searchParams);
            params.set(
              "from",
              date.from ? format(date.from, "yyyy-MM-dd") : ""
            );
            params.set("to", date.to ? format(date.to, "yyyy-MM-dd") : "");
            router.push(`/admin/analytics?${params.toString()}`);
          }
        }}
      >
        Apply
      </Button> */}
    </div>
  );
}
