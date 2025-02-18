import { useState, useEffect } from "react";
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
    async function fetchCountries() {
      try {
        const response = await fetch("https://api.fr.stg.shipglobal.in/api/v1/location/countries");
        const result = await response.json();
        if (result.data && result.data.countries) {
          const formattedCountries = result.data.countries.map((country: any) => ({
            value: country.country_iso2,
            label: country.country_display,
          }));
          setCountries(formattedCountries);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
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
