import { useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";

const ItemDetails = ({ form }: { form: any }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Function to recalculate the total price
  const calculateTotalPrice = () => {
    const newTotalPrice = fields.reduce((acc: number, field: any) => {
      const unitPrice = parseFloat(field.unitPrice);
      const qty = parseFloat(field.qty);
      return acc + unitPrice * qty;
    }, 0);
    setTotalPrice(newTotalPrice);
  };

  useEffect(() => {
    // Recalculate total price when fields change
    calculateTotalPrice();
  }, [fields]);

  const handleFieldChange = (index: number, field: string, value: any) => {
    // Update field value when changed
    form.setValue(`items.${index}.${field}`, value);
    calculateTotalPrice(); // Recalculate total price on field change
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="lg:flex items-center gap-x-2 ml-3">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-1 mt-5 items-center">
            {["productName", "sku", "hsn", "qty", "unitPrice"].map((itemField) => (
              <Controller
                key={itemField}
                control={form.control}
                name={`items.${index}.${itemField}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {itemField === "productName" && "Product Name"}
                      {itemField === "sku" && "SKU"}
                      {itemField === "hsn" && "HSN"}
                      {itemField === "qty" && "Qty"}
                      {itemField === "unitPrice" && "Unit Price (INR)"}
                      {itemField !== "sku" && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={itemField === "qty" || itemField === "unitPrice" ? "number" : "text"}
                        className="lg:w-24"
                        onChange={(e) => handleFieldChange(index, itemField, e.target.value)} 
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.items?.[index]?.[itemField]?.message}</FormMessage>
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
                  <Select onValueChange={(value) => handleFieldChange(index, "igst", value)} value={field.value}>
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
                  <FormMessage>{form.formState.errors.items?.[index]?.igst?.message}</FormMessage>
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
      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              productName: "",
              sku: "",
              hsn: "",
              qty: 0,
              unitPrice: 0,
              igst: "0", 
            })
          }
          className="flex items-center gap-2 mt-5"
        >
          <Plus className="w-4 h-4" /> Add Item
        </Button>
        <div className="mt-4 font-bold text-xl mr-4">Total Price: {totalPrice.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ItemDetails;
