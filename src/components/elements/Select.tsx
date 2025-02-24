import { ComboBox } from "./ComboBox";
import { customers } from "../array/array";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";

interface SelectProps {
  form: UseFormReturn<any>;
  name: string;
}

export const Select = ({ form, name }: SelectProps) => {
  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ComboBox
                frameworks={customers}
                placeholder="Select Customer"
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
