import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormComponentProps = {
  control: any;
  label: string;
  name: string;
  
};

export const FormComponent = ({ control, label, name, }: FormComponentProps) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">{label} <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage className="font-normal text-xs"/>
          </FormItem>
        )}
      />
    </div>
  );
};
