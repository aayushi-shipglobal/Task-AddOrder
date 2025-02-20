import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Required } from "./Required";

type OrderFormComponentProps = {
  name: string;
  label: string;
  control: any;
};

export const OrderFormComponent = ({ name, control, label }: OrderFormComponentProps) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-1 text-black">
              {label}
              {name == "invoiceNo" && <Required />}
            </FormLabel>
            <FormControl>
              <div className="flex flex-row border border-gray-300 rounded">
                <Input className="border-none" {...field} placeholder={`Enter ${label}...`} />
              </div>
            </FormControl>
            <FormMessage className="font-normal text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
