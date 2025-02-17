import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";

type ShipmentDetailsComponentProps = {
  control: any;
  name: string;
  label: string;
  unit: string;
  placeholder?:string;
};

export const ShipmentDetailsComponent = ({ control, name, label, unit,placeholder }: ShipmentDetailsComponentProps) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="mb-1 text-black">
              {label}
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <div className="flex flex-row border border-gray-300 rounded">
                <Input {...field} className="border-none shadow-none h-10 focus-visible:ring-0" placeholder={placeholder}/>
                <span className=" px-3 py-2 border-l border-gray-300  bg-gray-200">{unit}</span>
              </div>
            </FormControl>

            <FormMessage className="font-normal text-xs"/>
          </FormItem>
        )}
      />
    </div>
  );
};
