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
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ control, name, label }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | null, field: any) => {
    if (selectedDate) {
      field.onChange(selectedDate); 
    }
    setPopoverOpen(false);
  };

  return (
    <FormItem>
      <FormLabel className="font-normal">
        {label} <Required />
      </FormLabel>
      <FormControl>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "lg:w-full justify-start text-left font-normal flex h-9 w-full rounded-sm border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
                      !field.value && "text-muted-foreground ",
                    )}
                  >
                    <span className="flex-grow">
                      {field.value ? format(field.value, "PPP") : "Pick a Date"}
                    </span>
                    <CalendarIcon className="ml-auto" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(selectedDate) => handleDateSelect(selectedDate, field)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {!field.value && (
                <FormMessage className="font-normal text-xs">Please select invoice date</FormMessage>
              )}
            </>
          )}
        />
      </FormControl>
    </FormItem>
  );
};

export default DatePicker;
