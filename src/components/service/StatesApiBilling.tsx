import { useState, useEffect, useRef } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ComboboxDemo } from "@/components/elements/ComboboxDemo";
import { fetchStatesByCountry } from "./Services";
import { Required } from "@/components/elements/Required";

type Props = {
  form: any;
  name: string;
};

export const StatesApiBilling = ({ form, name }: Props) => {
  const [states, setStates] = useState<any[]>([]);

  const countrySelected = form.watch("Country");
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
            State
            <Required />
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
          <FormMessage className="font-normal text-xs" />
        </FormItem>
      )}
    />
  );
};
