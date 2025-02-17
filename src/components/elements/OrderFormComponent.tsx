import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type OrderFormComponentProps={
    name:string;
    label:string;
    control:any;
    placeholder?:string
}

export const OrderFormComponent = ({name,control,label,placeholder}:OrderFormComponentProps) => {
  return (
    <div>
         <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1 text-black">
                  {label}<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex flex-row border border-gray-300 rounded">
                    <Input className="border-none" {...field} placeholder={placeholder}/>
                  </div>
                </FormControl>
                <FormMessage className="font-normal text-xs" />
              </FormItem>
            )}
          />
    </div>
  )
}
