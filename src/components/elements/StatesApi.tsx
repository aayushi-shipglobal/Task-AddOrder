import { useState, useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ComboboxDemo } from "./ComboboxDemo";

type Props = {
  form: any;
  name: string;
};

export const StatesApi = ({ form, name }: Props) => {
  const [states, setStates] = useState<any[]>([]);

  const countrySelected = form.watch("country");

  useEffect(() => {
    if (!countrySelected) {
      setStates([]);
      return;
    }

    const fetchStates = async () => {
      try {
        const response = await fetch(`https://api.fr.stg.shipglobal.in/api/v1/location/states`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state_country_code: countrySelected,
          }),
        });

        const result = await response.json();

        if (result.data && result.data.states) {
          const formattedStates = result.data.states.map((state: any) => ({
            value: state.state_name,
            label: state.state_name,
          }));
          setStates(formattedStates);

          const currentState = form.getValues(name);
          if (!formattedStates.some((state) => state.value === currentState)) {
            form.setValue(name, "");
          }
        }
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
