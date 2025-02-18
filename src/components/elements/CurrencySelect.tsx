import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ComboboxDemo } from "../elements/ComboboxDemo";
interface CurrencySelectProps {
  control: any;
  frameworks: any;
  label: string;
  placeholder?: string;
  name: string;
}

const CurrencySelect = ({ control, name, frameworks, label, placeholder = "INR" }: CurrencySelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <div className="flex flex-row border border-gray-300 rounded mt-2">
              <ComboboxDemo
                label={placeholder}
                frameworks={frameworks}
                value={field.value}
                onChange={field.onChange}
                placeholder={placeholder}
              />
            </div>
          </FormControl>
          <FormMessage className="font-normal text-xs" />
        </FormItem>
      )}
    />
  );
};

export default CurrencySelect;
