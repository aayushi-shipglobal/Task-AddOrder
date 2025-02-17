import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { ComboBox } from "./ComboBox";

interface SelectProps {
  form: UseFormReturn<any>;
  name: string;
}

export const Select = ({ form, name }: SelectProps) => {
  const customers = [
    {
      value: "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045",
      label: "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045",
    },
  ];

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
