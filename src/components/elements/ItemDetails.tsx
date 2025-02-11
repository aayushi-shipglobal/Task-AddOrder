import { useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { Input } from "../ui/input";

const ItemDetails = ({ form }) => {
  const itemFields = ["productName", "sku", "hsn", "qty", "unitPrice"];
  type ItemFields = "productName" | "sku" | "hsn" | "qty" | "unitPrice";

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="lg:flex items-center gap-x-2 ml-3">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-1 mt-5 items-center">
            {(itemFields as ItemFields[]).map((itemField) => (
              <Controller
                key={itemField}
                control={form.control}
                name={`items.${index}.${itemField}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {itemField === "productName"
                        ? "Product Name"
                        : itemField === "sku"
                        ? "SKU"
                        : itemField === "hsn"
                        ? "HSN"
                        : itemField === "qty"
                        ? "Qty"
                        : "Unit Price (INR)"}
                      {itemField !== "sku" && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={itemField === "qty" || itemField === "unitPrice" ? "number" : "text"}
                        className={`lg:w-24 `}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Controller
              control={form.control}
              name={`items.${index}.igst`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    IGST <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select IGST" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="12">12%</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                      <SelectItem value="28">28%</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {fields.length > 1 && (
            <div onClick={() => remove(index)} className="mt-7 cursor-pointer">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          append({
            product_name: "",
            sku: "",
            hsn: "",
            qty: "",
            unit_price: "",
            igst: "0",
          })
        }
        className="flex items-center gap-2 mt-5"
      >
        <Plus className="w-4 h-4" /> Add Item
      </Button>
    </div>
  );
};

export default ItemDetails;
