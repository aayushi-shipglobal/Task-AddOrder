import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Required } from "./Required";

const ItemDetails = ({ form, errorMessage }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const items = form.watch("items") || [];
  const currency = form.watch("invoiceCurrency");

  const itemFields: Record<string, string> = {
    productName: "Product Name",
    sku: "SKU",
    hsn: "HSN",
    qty: "Qty",
    unitPrice: `Unit Price (${currency})`,
  };

  const calculateTotalPrice = items.reduce((accum: number, item: { qty: number; unitPrice: number }) => {
    return accum + (item.qty || 0) * (item.unitPrice || 0);
  }, 0);

  const renderFormField = (itemField: string, index: number) => (
    <FormField
      key={itemField}
      control={form.control}
      name={`items.${index}.${itemField}`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal text-black text-ellipsis overflow-hidden whitespace-nowrap">
            {itemFields[itemField]}
            {itemField !== "sku" && <Required />}
          </FormLabel>
          <FormControl>
            <Input placeholder={`Enter ${itemFields[itemField]}...`} {...field} className="lg:w-full" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderIGSTField = (index: number) => (
    <FormField
      control={form.control}
      name={`items.${index}.igst`}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal text-black">
            IGST <Required />
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={true} >
            <FormControl className="w-16">
              <SelectTrigger>
                <SelectValue placeholder="0%" className="w-16"/>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-16">
              <SelectItem value="0">0%</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="lg:flex items-center gap-x-2">
          <div className="grid grid-cols-1 lg:flex  gap-2 mt-2">
            {Object.keys(itemFields).map((itemField) => renderFormField(itemField, index))}
            {renderIGSTField(index)}
          </div>
          {index > 0 && <Trash2 className="w-5 h-5 cursor-pointer text-red-500 mt-8 font-normal" onClick={() => remove(index)} />}
        </div>
      ))}
      {errorMessage && <div className="mt-4 font-semibold text-red-500 text-sm">{errorMessage}</div>}

      <div className="flex flex-col md:flex-row md:justify-between mt-7">
        <Button
          type="button"
          onClick={() =>
            append({
              productName: "",
              sku: "",
              hsn: "",
              qty: "",
              unitPrice: "",
              igst: "0",
            })
          }
          className="flex border-0 shadow-none text-sm max-w-max items-center gap-2 bg-transparent hover:bg-transparent"
        >
          <Plus className="w-4 h-4 text-blue-800" />
          <span className="text-blue-800 underline font-medium">Add Another Product</span>
        </Button>
       
        <p className="text-base font-semibold mt-2">
          Total Price: {currency} {calculateTotalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ItemDetails;
