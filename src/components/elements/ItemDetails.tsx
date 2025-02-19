import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

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

  const placeholderTexts: Record<string, string> = {
    productName: "Enter Product Name...",
    sku: "Enter SKU...",
    hsn: "Enter HSN...",
    qty: "Enter Quantity...",
    unitPrice: "Enter Unit Price...",
  };

  const calculateTotalPrice = items.reduce((accum: number, item: { qty: number; unitPrice: number }) => {
    return accum + (item.qty || 0) * (item.unitPrice || 0);
  }, 0);

  const renderFormField = (itemField: string, field: any, index: number) => (
    <FormField
      key={itemField}
      control={form.control}
      name={`items.${index}.${itemField}` as const}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal">
            {itemFields[itemField]}
            {itemField !== "sku" && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholderTexts[itemField]}
              {...field}
              type={itemField === "qty" || itemField === "unitPrice" ? "number" : "text"}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderIGSTField = (field: any, index: number) => (
    <FormField
      control={form.control}
      name={`items.${index}.igst` as const}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal">
            IGST <span className="text-red-500">*</span>
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={true}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select IGST" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
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
        <div key={field.id} className="lg:flex items-center gap-x-1">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-1 mt-2">
            {Object.keys(itemFields).map((itemField) => renderFormField(itemField, field, index))}
            {renderIGSTField(field, index)}
          </div>
          {index > 0 && (
            <Trash2
              className="w-7 h-7 cursor-pointer text-red-500 mt-8"
              onClick={() => remove(index)}
            />
          )}
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
          className="flex bg-white border-0 shadow-none text-sm max-w-max items-center gap-2"
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
