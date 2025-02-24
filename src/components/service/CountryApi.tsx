import { useState, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Required } from "../elements/Required";


interface ComboboxProps {
  options: any;
  placeholder: string;
  field: any;
  disabled?: boolean;
  name:string;
}

function Combobox({ options, placeholder, field, disabled, name }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredOptions = options.filter((option: any) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const selectedOption = options.find((option: any) => option.value === field.value);

  useEffect(() => {
    if (selectedOption) {
      if (name === "country") {
        localStorage.setItem("value", selectedOption.label);
      } else {
        localStorage.setItem("item", selectedOption.label);
      }
    }
  }, [selectedOption, name]);



  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-9 text-gray-600 justify-between overflow-hidden truncate"
          disabled={disabled}
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      {!disabled && (
        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
          <Command>
            <CommandInput placeholder={placeholder} value={searchQuery} onValueChange={setSearchQuery} />
            <CommandList>
              {filteredOptions.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredOptions.map((option: any) => (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => {
                        field.onChange(option.value);
                        setOpen(false);
                      }}
                      
                    >
                      <Check
                        className={`mr-2 truncate h-4 w-4 ${
                          field.value === option.value ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}

export function CountryApi({ form, name, label }: any) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://api.fr.stg.shipglobal.in/api/v1/location/countries");
        const result = await response.json();
        if (result.data && result.data.countries) {
          const formattedCountries = result.data.countries.map((country: any) => ({
            value: country.country_iso2,
            label: country.country_display,
          }));
          setCountries(formattedCountries);
          localStorage.setItem("countries", JSON.stringify(formattedCountries));
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal">
            {label} {<Required />}
          </FormLabel>
          <FormControl>
            <Combobox options={countries} placeholder="Select Country" field={field} name={name} />
          </FormControl>
          <FormMessage className="font-normal text-xs"/>
        </FormItem>
      )}
    />
  );
}
export default CountryApi;
