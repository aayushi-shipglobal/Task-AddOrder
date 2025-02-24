"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { fetchStatesByCountry } from "./Services";
import { Required } from "../elements/Required";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandList, CommandItem, CommandGroup, CommandInput, CommandEmpty } from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Framework = {
  value: string;
  label: string;
};

type ComboboxDemoProps = {
  label: string;
  frameworks: Framework[];
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
};

function ComboboxDemo({ label, frameworks, placeholder, value, onChange }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-slate-100 text-gray-600 w-full"
        >
          {frameworks.find((framework) => framework.value === value)?.label || label}
          <ChevronDown className="mr-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No state found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
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

type Props = {
  form: any;
  name: string;
};

export const StatesApi = ({ form, name }: Props) => {
  const [states, setStates] = useState<Framework[]>([]);
  const countrySelected = form.watch("country");

  const prevCountry = useRef(countrySelected);

  useEffect(() => {
    if (!countrySelected) {
      form.setValue(name, "");
      setStates([]);
      return;
    }
    if (prevCountry.current !== countrySelected) {
      form.setValue(name, "");
      prevCountry.current = countrySelected;
    }
    const fetchStates = async () => {
      try {
        const formattedStates = await fetchStatesByCountry(countrySelected);
        setStates(formattedStates);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, [countrySelected, form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700">
            State <Required />
          </FormLabel>
          <FormControl>
            <ComboboxDemo
              {...field}
              frameworks={states}
              label="Select a State"
              placeholder="Select state"
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage className="font-normal text-xs">{form.formState.errors[name]?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};
