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
  value?: string;
  onChange?: (value: string) => void;
};

export function ComboboxDemo({
  label,
  frameworks,
  placeholder,
  value,
  onChange,
}: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const filteredFrameworks = frameworks.filter((framework) =>
    framework.label.toLowerCase().includes(query.toLowerCase())
  );

  const selectedOption = frameworks.find((framework) => framework.value === value);

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue === value ? "" : selectedValue);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-slate-100 text-gray-600 w-full"
        >
          {selectedOption ? selectedOption.label : label}
          <ChevronDown className="mr-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {filteredFrameworks.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredFrameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.label}
                    onSelect={() => handleSelect(framework.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
