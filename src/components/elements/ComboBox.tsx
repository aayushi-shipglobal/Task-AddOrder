"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Framework = {
  value: string;
  label: string;
};

type ComboboxDemoProps = {
  label: string;
  frameworks: Framework[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function ComboBox({
  label,
  frameworks,
  placeholder,
  value,
  onChange,
}: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    onChange(currentValue === value ? "" : currentValue); 
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-controls="combobox-list"
          aria-activedescendant={value ? `combobox-item-${value}` : undefined}
          className="justify-between bg-slate-100 text-gray-600 w-full"
        >
          {value ? frameworks.find((framework) => framework.value === value)?.label : label}

          <ChevronDown className="mr-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList id="combobox-list">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  id={`combobox-item-${framework.value}`}
                  value={framework.value}
                  onSelect={() => handleSelect(framework.value)}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
