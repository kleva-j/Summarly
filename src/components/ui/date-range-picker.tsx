"use client";

import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { addMonths, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

import {
	PopoverTrigger,
	PopoverContent,
	Popover,
} from "@/components/ui/popover";

interface DateRangePickerProps {
	dateRange: DateRange | undefined;
	setDateRange: (date: DateRange | undefined) => void;
}

export const DateRangePicker = forwardRef<
	HTMLButtonElement,
	DateRangePickerProps
>(({ dateRange, setDateRange }, ref) => {
	return (
		<div className={cn("grid gap-2")}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						ref={ref}
						variant={"outline"}
						className={cn(
							"w-[260px] justify-start text-left font-normal",
							!dateRange && "text-muted-foreground",
							"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{dateRange?.from ? (
							dateRange.to ? (
								<>
									{format(dateRange.from, "LLL dd, y")} -{" "}
									{format(dateRange.to, "LLL dd, y")}
								</>
							) : (
								format(dateRange.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="end">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={
							dateRange?.to
								? addMonths(dateRange.to, -1)
								: dateRange?.from
									? addMonths(dateRange.from, -1)
									: addMonths(new Date(), -1)
						}
						selected={dateRange}
						onSelect={setDateRange}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
});

DateRangePicker.displayName = "CalendarDateRangePicker";
