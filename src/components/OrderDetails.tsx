import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ShipmentDetailsComponent } from "./elements/ShipmentDetailsComponent";
import { OrderFormComponent } from "./elements/OrderFormComponent";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateOrderData } from "./redux/addOrderSlice";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ItemDetails from "./elements/ItemDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ComboboxDemo } from "./elements/ComboboxDemo";

const formSchema = z.object({
  actualWeight: z
    .string()
    .min(1, "The package weight is required.")
   ,
  length: z
    .string()
    .min(1, "The package length is required.")
   ,
  breadth: z
    .string()
    .min(1, "The package breadth is required.")
    ,
  height: z
    .string()
    .min(1, "The package height is required.")
    ,
  invoiceNo: z
    .string()
    .min(2, "The invoice number is required.")
   ,
  invoiceDate: z.string(),
  invoiceCurrency: z.string(),
  orderId: z.string(),
  iossNumber: z.string(),
  items: z.array(
    z.object({
      productName: z.string().min(2, "Product Title is required."),
      sku: z.string().optional(),
      hsn: z.string().min(2, "HSN is required."),
      qty: z
        .string()
        .min(1, "Product Qty is required.")
        ,
      unitPrice: z
        .string()
        .min(1, "Product Price is required.")
        ,
      igst: z.string(),
    }),
  ),
});

export const OrderDetails = ({ setActiveStep }) => {
  const [date, setDate] = React.useState<Date>();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useDispatch();
  const orderDetails = useSelector((state: RootState) => state.addOrder.orderDetailsData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: orderDetails,
  });

  const orderData = form.watch();
  const itemDetails = (form.getValues("items") || []).map((item: any, index: any) => ({
    productName: form.watch(`items.${index}.productName`),
    sku: form.watch(`items.${index}.sku`),
    hsn: form.watch(`items.${index}.hsn`),
    qty: form.watch(`items.${index}.qty`),
    unitPrice: form.watch(`items.${index}.unitPrice`),
    igst: form.watch(`items.${index}.igst`),
  }));

  const AmountApi = async () => {
    const url = "https://api.fr.stg.shipglobal.in/api/v1/orders/validate-order-invoice";
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMTEgMTc6MTY6MTAuNTk0ODQ3IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMyAxNzoxNjoxMC41OTQ4NDkiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6IjU0YTVhMDZmLTlmMTItNDNkMS05NjRmLWY0NmU0NDAzZmJlYiIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.Mgqd-wgxjBYG2o9rztEvgrEzuEXxUYjoKXcmmDCg1jw";

    const payload = {
      csbv: "0",
      currency_code: orderData.invoiceCurrency,
      package_breadth: Number(orderData.breadth),
      package_height: Number(orderData.height),
      package_length: Number(orderData.length),
      package_weight: Number(orderData.actualWeight),
      vendor_order_item: itemDetails.map((item) => ({
        vendor_order_item_name: item.productName,
        vendor_order_item_sku: item.sku,
        vendor_order_item_hsn: item.hsn,
        vendor_order_item_quantity: Number(item.qty),
        vendor_order_item_unit_price: Number(item.unitPrice),
        vendor_order_item_tax_rate: item.igst,
      })),
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.data?.box?.["1"]?.exceeds_limit) {
        setErrorMessage(result.data.box["1"].exceeds_text);
        setError(true);
        return false;
      } else {
        setErrorMessage("");
        setError(false);
        return true;
      }
    } catch (error) {
      console.error("Error fetching order validation:", error);
      setErrorMessage("There was an error while validating the order.");
      setError(true);
      return false;
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const isValid = await AmountApi();

    if (!isValid) {
      return;
    }

    console.log("Form Values:", values);
    dispatch(updateOrderData(values));
    setActiveStep(4);
  };

  const frameworks = [
    {
      value: "EUR",
      label: "EUR",
    },
    {
      value: "GBP",
      label: "GBP",
    },
    {
      value: "INR",
      label: "INR",
    },
    {
      value: "SAR",
      label: "SAR",
    },
    {
      value: "USD",
      label: "USD",
    },
  ];
  return (
    <div className="px-3 md:px-7 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-2 gap-x-4">
              <OrderFormComponent
                control={form.control}
                label="Invoice No."
                name="invoiceNo"
                placeholder="Enter Invoice Number..."
              />
              <FormField
                control={form.control}
                name="invoiceDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1 text-black">
                      Invoice Date<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-row border border-gray-300 rounded">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "lg:w-[240px] w-[700px] justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                              placeholder="Pick a Date"
                            >
                              <CalendarIcon />
                              {date ? format(date, "PPP") : ""}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(date) => {
                                setDate(date);
                                field.onChange(date);
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage className="font-normal text-xs" />
                  </FormItem>
                )}
              />

              <div className="">
                <FormLabel className="mb-3 text-black">
                  Invoice Currency
                  <span className="text-red-500">*</span>
                </FormLabel>
                <FormField
                  control={form.control}
                  name="invoiceCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-row border border-gray-300 rounded mt-2">
                          <ComboboxDemo
                            label="INR"
                            frameworks={frameworks}
                            value={field.value}
                            onChange={(value: any) => field.onChange(value)}
                            placeholder={"INR"}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="font-normal text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <OrderFormComponent
                control={form.control}
                label="Order/Reference ID"
                name="orderId"
                placeholder="Enter Order/Reference ID..."
              />

              <OrderFormComponent
                control={form.control}
                label="IOSS Number:"
                name="iossNumber"
                placeholder="Enter IOSS Number..."
              />
            </div>
          </div>
          <p className="text-base font-bold mt-6">Box Measurements</p>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-2 gap-x-4">
            <ShipmentDetailsComponent
              control={form.control}
              name="actualWeight"
              label="Dead Weight"
              unit="kg"
              placeholder="Eg. 1.25"
            />
            <ShipmentDetailsComponent
              control={form.control}
              name="length"
              label="Length"
              unit="cm"
              placeholder="Eg. 10"
            />
            <ShipmentDetailsComponent
              control={form.control}
              name="breadth"
              label="Breadth"
              unit="cm"
              placeholder="Eg. 10"
            />
            <ShipmentDetailsComponent
              control={form.control}
              name="height"
              label="Height"
              unit="cm"
              placeholder="Eg. 10"
            />
          </div>
          
          <div>
            <div className="flex gap-x-1 mt-6">
              <div className="font-bold text-base">Item(s) Details</div>
              <p className="bg-orange-50 text-red-500 rounded-md text-xs text-center p-1">Items that can export</p>
            </div>

            <ItemDetails form={form} errorMessage={errorMessage}/>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-800 text-sm font-medium text-white rounded-md px-4 py-2 hover:bg-blue-800/90"
            >
              Select Shipping
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
