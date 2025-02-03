import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderFormComponent } from "./OrderFormComponent";

const formSchema = z.object({
  productName: z.string().min(2,"Product Title is required."),
  sku: z.string().optional(),
  hsn: z.string().min(2,"HSN is required."),
  qty: z.string().min(2,"Product Qty is required."),
  unitPrice: z.string().min(2,"Product Price is required."),
  igst:z.string(),
});

export const ItemDetails = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      sku: "",
      hsn: "",
      qty: "",
      unitPrice: "",
      igst:"",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <div className="font-semibold text-lg mt-9 ml-6">Item Details</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-2 ml-6 items-center mt-4 text-sm">
            <OrderFormComponent control={form.control} label="Product Name" name="productName" />
            <OrderFormComponent control={form.control} label="SKU" name="sku" />
            <OrderFormComponent control={form.control} label="HSN" name="hsn" />
            <OrderFormComponent control={form.control} label="Qty" name="qty" />
            <OrderFormComponent control={form.control} label="Unit Price(INR)" name="unitPrice" />
            <OrderFormComponent control={form.control} label="IGST" name="igst" />
          </div>
        </form>
      </Form>
    </div>
  );
};
