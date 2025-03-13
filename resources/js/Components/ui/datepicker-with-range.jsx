import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePickerWithRange({ className, onChange }) {
  const [date, setDate] = useState(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (onChange) {
      const formattedDate = {
        from: newDate?.from ? format(newDate.from, "yyyy-MM-dd") : null,
        to: newDate?.to ? format(newDate.to, "yyyy-MM-dd") : null,
      };
      onChange(formattedDate);
    }
  };

  return (
    <div className={`grid gap-2 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant="outline" className={`w-[250px] justify-start text-left font-normal ${!date ? "text-muted-foreground" : ""}`}>
            <CalendarIcon />
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
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={new Date()}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}