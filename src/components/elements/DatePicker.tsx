import React from "react";
import { Control, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface DatePickerProps {
  control: Control<any>;
  name: string;
  label: string;
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  control,
  name,
  label,
  date,
  setDate,
 
}) => {
  return (
    <FormItem>
      <FormLabel>
        {label} <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "lg:w-[240px] w-[700px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
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
                    setDate(selectedDate);
                    field.onChange(selectedDate);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </FormControl>
      <FormMessage className="font-normal text-xs" />
    </FormItem>
  );
};

export default DatePicker;
