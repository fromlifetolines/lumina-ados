'use client';

import * as React from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export function DateRangePicker({ className }: { className?: string }) {
    const [date] = React.useState<{ from: Date; to: Date }>({
        from: new Date(new Date().setDate(new Date().getDate() - 30)),
        to: new Date(),
    });

    return (
        <div className={cn("grid gap-2", className)}>
            <button
                id="date"
                className={cn(
                    "flex items-center justify-start text-left font-normal glass px-4 py-2 rounded-xl hover:bg-white/10 transition-colors",
                    !date && "text-muted-foreground"
                )}
            >
                <CalendarIcon className="mr-2 h-4 w-4 text-blue-400" />
                {date?.from ? (
                    date.to ? (
                        <>
                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </>
                    ) : (
                        format(date.from, "LLL dd, y")
                    )
                ) : (
                    <span>Pick a date</span>
                )}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </button>
        </div>
    );
}
