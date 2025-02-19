import { useState, useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ComboboxDemo } from "../elements/ComboboxDemo";
import { fetchStatesByCountry } from "./Services";

type Props = {
  form: any;
  name: string;
};

export const StatesApi = ({ form, name }: Props) => {
  const [states, setStates] = useState<any[]>([]);

  const countrySelected = form.watch("country");

  useEffect(() => {
    if (!countrySelected) {
      form.setValue(name, "");
      setStates([]);
      return;
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
            State <span className="text-red-500">*</span>
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
