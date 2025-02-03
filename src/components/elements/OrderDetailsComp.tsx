import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OrderFormComponent } from "./OrderFormComponent";

const formSchema = z.object({
  invoiceNo: z.string().min(2),
  invoiceDate: z.string(),
  invoiceCurrency: z.string(),
  orderId: z.string(),
  iossNumber: z.string(),
});

export const OrderDetailsComp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNo: "",
      invoiceDate: "",
      invoiceCurrency: "",
      orderId: "",
      iossNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <div className="font-semibold text-lg mt-9 ml-6">Order Details</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-6">
            <OrderFormComponent control={form.control} label="Invoice No." name="invoiceNo" />
            <OrderFormComponent control={form.control} label="Invoice Date" name="invoiceDate" />
            <OrderFormComponent control={form.control} label="Invoice Currency" name="invoiceCurrency" />
            <OrderFormComponent control={form.control} label="Order Id/Ref. Id" name="orderId" />
          </div>
          <div className="ml-6 my-6 w-1/4 pr-4">
            <OrderFormComponent control={form.control} label="IOSS Number:" name="iossNumber" />
          </div>
        </form>
      </Form>
    </div>
  );
};
