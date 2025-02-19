import { useState, useEffect } from "react";
import { fetchCountry } from "./Services";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ComboboxDemo } from "../elements/ComboboxDemo";

type Props = {
  control: any;
  name: string;
};

export function CountryApi({ control, name }: Props) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);

        const fetchedCountries = await fetchCountry();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700">
            Country<span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ComboboxDemo {...field} frameworks={countries} label="Select a Country" placeholder="Select Country" />
            )}
          </FormControl>
          <FormMessage className="font-normal text-xs" />
        </FormItem>
      )}
    />
  );
}
