"use client";

import { Required } from "@/components/elements/Required";
import { fetchStatesByCountry } from "./Services";
import { useState, useEffect, useRef } from "react";
import { ComboboxDemo } from "@/components/elements/ComboboxDemo";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type Framework = {
  value: string;
  label: string;
};

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
