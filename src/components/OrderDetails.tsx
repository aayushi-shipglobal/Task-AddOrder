import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ShipmentDetailsComponent } from "./elements/ShipmentDetailsComponent";
import { OrderFormComponent } from "./elements/OrderFormComponent";

const formSchema = z.object({
  actualWeight: z.string().min(1, "The package weight is required."),
  length: z.string().min(1, "The package length is required."),
  breadth: z.string().min(1, "The package breadth is required."),
  height: z.string().min(1, "The package height is required."),
  invoiceNo: z.string().min(2, "The invoice number is required."),
  invoiceDate: z.string(),
  invoiceCurrency: z.string(),
  orderId: z.string(),
  iossNumber: z.string(),
  productName: z.string().min(2, "Product Title is required."),
  sku: z.string().optional(),
  hsn: z.string().min(2, "HSN is required."),
  qty: z.string().min(2, "Product Qty is required."),
  unitPrice: z.string().min(2, "Product Price is required."),
  igst: z.string(),
});
import { StepperSidebar } from "./elements/StepperSidebar";
import { Button } from "./ui/button";
export const OrderDetails = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      actualWeight: "",
      length: "",
      breadth: "",
      height: "",
      invoiceNo: "",
      invoiceDate: "",
      invoiceCurrency: "",
      orderId: "",
      iossNumber: "",
      productName: "",
      sku: "",
      hsn: "",
      qty: "",
      unitPrice: "",
      igst: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex lg:flex-row space-x-6 justify-center py-12 px-28">
      <StepperSidebar />

      <div className="bg-white rounded-md w-2/3 px-8">
        <div className="font-semibold text-lg mt-9 ml-6 mb-2">Shipment Type</div>
        <p className="text-gray-400 text-sm font-semibold ml-6 mb-4">
          Please select the shipment Mode. Note: CSB-V Shipments can only be sent through ShipGlobal Direct. If other
          partner services are needed please select CSB IV.
        </p>
        <p className="text-gray-500 ml-6 font-medium">
          If you need more info, please call/whatsapp at
          <span className="text-blue-500 cursor-pointer">+91 9811098919.</span>
        </p>
        {/* <div className="grid grid-cols-2">
            <Card title="CSB IV" description="Non Commercial Mode Minimum Documentation All Service Providers"/>
            <Card title="CSB V" description="Commercial Mode "/>
          </div> */}
        <div>
          {/* Shipment Details Section */}
          <div className="font-semibold text-lg mt-9 ml-6">Shipment Details</div>
          <p className="text-gray-400 text-sm font-semibold ml-6 mb-3">
            If you need more info, please check out <span className="text-blue-500 cursor-pointer">Help Page.</span>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-6">
                <ShipmentDetailsComponent control={form.control} name="actualWeight" label="Actual Weight" unit="KG" />
                <ShipmentDetailsComponent control={form.control} name="length" label="Length" unit="CM" />
                <ShipmentDetailsComponent control={form.control} name="breadth" label="Breadth" unit="CM" />
                <ShipmentDetailsComponent control={form.control} name="height" label="Height" unit="CM" />
              </div>

              <div>
                <div className="font-semibold text-lg mt-9 ml-6">Order Details</div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-6">
                  <OrderFormComponent control={form.control} label="Invoice No." name="invoiceNo" />
                  <OrderFormComponent control={form.control} label="Invoice Date" name="invoiceDate" />
                  <OrderFormComponent control={form.control} label="Invoice Currency" name="invoiceCurrency" />
                  <OrderFormComponent control={form.control} label="Order Id/Ref. Id" name="orderId" />
                </div>
                <div className="ml-6 my-6 w-1/4 pr-4">
                  <OrderFormComponent control={form.control} label="IOSS Number:" name="iossNumber" />
                </div>
              </div>

              <div>
                <div className="font-semibold text-lg mt-9 ml-6">Item Details</div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-2 ml-6 items-center mt-4 text-sm">
                  <OrderFormComponent control={form.control} label="Product Name" name="productName" />
                  <OrderFormComponent control={form.control} label="SKU" name="sku" />
                  <OrderFormComponent control={form.control} label="HSN" name="hsn" />
                  <OrderFormComponent control={form.control} label="Qty" name="qty" />
                  <OrderFormComponent control={form.control} label="Unit Price (INR)" name="unitPrice" />
                  <OrderFormComponent control={form.control} label="IGST" name="igst" />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Submit
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
