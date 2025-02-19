import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Required } from "./Required";

export type FormComponentProps = {
  control: any;
  label: string;
  name: string;
  placeholder?: string;
};

export const FormComponent = ({ control, label, name}: FormComponentProps) => {
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">
              {label}
              {(name !== "landmark" && name !== "mark") && <Required/>}{" "}
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder={`Enter ${label}...`} />
            </FormControl>
            <FormMessage className="font-normal text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
};
