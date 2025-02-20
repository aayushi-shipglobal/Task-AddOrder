import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Required } from "./Required";

interface DatePickerProps {
  control: Control<any>;
  name: string;
  label: string;
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ control, name, label, date, setDate }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | null) => {
    setDate(selectedDate);
    setPopoverOpen(false); // Close popover after selecting a date
  };

  return (
    <FormItem>
      <FormLabel>
        {label} <Required />
      </FormLabel>
      <FormControl>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "lg:w-[230px] justify-start text-left font-normal flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors",
                    !date && "text-muted-foreground ",
                  )}
                >
                  <span className="flex-grow">{date ? format(date, "PPP") : "Pick a Date"}</span>
                  <CalendarIcon className="ml-auto" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    handleDateSelect(selectedDate); 
                    field.onChange(selectedDate);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </FormControl>
      {!date && <FormMessage className="font-normal text-xs">Please select invoice date</FormMessage>}
    </FormItem>
  );
};

export default DatePicker;
