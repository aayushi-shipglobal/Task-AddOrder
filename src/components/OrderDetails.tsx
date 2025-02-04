import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ShipmentDetailsComponent } from "./elements/ShipmentDetailsComponent";
import { OrderFormComponent } from "./elements/OrderFormComponent";
import * as React from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, FilePenLine, UserRoundCheck } from "lucide-react";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const formSchema = z.object({
  actualWeight: z
    .string()
    .min(1, "The package weight is required.")
    .transform((val) => parseFloat(val)) // Convert string to number
    .refine((val) => !isNaN(val), {
      message: "The package weight must be a numeric value.",
    })
    .refine((val) => val > 0, {
      message: "The package weight must be greater than zero.",
    }),

  length: z
    .string()
    .min(1, "The package length is required.")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "The package length must be a numeric value.",
    })
    .refine((val) => val > 0, {
      message: "The package length must be greater than zero.",
    }),

  breadth: z
    .string()
    .min(1, "The package breadth is required.")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "The package breadth must be a numeric value.",
    })
    .refine((val) => val > 0, {
      message: "The package breadth must be greater than zero.",
    }),

  height: z
    .string()
    .min(1, "The package height is required.")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: "The package height must be a numeric value.",
    })
    .refine((val) => val > 0, {
      message: "The package height must be greater than zero.",
    }),
  invoiceNo: z.string().min(2, "The invoice number is required."),
  invoiceDate: z.string(),
  invoiceCurrency: z.string(),
  orderId: z.string(),
  iossNumber: z.string(),
  items: z.array(
    z.object({
      productName: z.string().min(2, "Product Title is required."),
      sku: z.string().optional(),
      hsn: z.string().min(2, "HSN is required."),
      qty: z.string().min(2, "Product Qty is required."),
      unitPrice: z.string().min(2, "Product Price is required."),
      igst: z.string(),
    }),
  ),
});
import { StepperSidebar } from "./elements/StepperSidebar";
import { ComboboxDemo } from "./elements/ComboboxDemo";
import ItemDetails from "./elements/ItemDetails";

export const OrderDetails = ({ nextStep, prevStep }) => {
  const [date, setDate] = React.useState<Date>();

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
      items: [
        {
          productName: "",
          sku: "",
          hsn: "",
          qty: "",
          unitPrice: "",
          igst: "",
        },
      ],
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("orderFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
       
        form.setValue(key as keyof z.infer<typeof formSchema> , parsedData[key]);
      });
    }
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
     localStorage.setItem("orderFormData", JSON.stringify(values));
    nextStep();
  }

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
    <div className="flex lg:flex-row space-x-6 justify-center py-12 px-28">
      <StepperSidebar />

      <div className="bg-white rounded-md w-2/3 px-6">
        <div className="font-semibold text-lg mt-9 ml-6 mb-2">Shipment Type</div>
        <p className="text-gray-400 text-sm font-semibold ml-6 mb-4">
          Please select the shipment Mode. Note: CSB-V Shipments can only be sent through ShipGlobal Direct. If other
          partner services are needed please select CSB IV.
        </p>
        <p className="text-gray-500 ml-6 font-medium">
          If you need more info, please call/whatsapp at
          <span className="text-blue-500 cursor-pointer">+91 9811098919.</span>
        </p>
        <div className="grid grid-cols-2 space-x-4 mt-6 cursor-pointer">
          <div className="border border-dashed border-blue-300 bg-blue-100 rounded-md py-4">
            <p className="font-bold text-center mb-4">CSB IV</p>
            <div className="flex flex-row gap-x-10 items-center ml-12">
              <UserRoundCheck className="fill-blue-500 text-blue-500" />
              <div className="text-sm text-gray-500 font-semibold mb-2">
                <p>Non Commercial Mode</p>
                <p>Minimum Documentation</p>
                <p>All Service Providers</p>
              </div>
            </div>
          </div>
          <div className="border border-dashed border-gray-300 bg-gray-100 rounded-md py-4">
            <p className="font-bold text-center mb-4">CSB V</p>
            <div className="flex flex-row gap-x-10 items-center ml-11">
              <FilePenLine />
              <div className="text-sm text-gray-500 font-semibold mb-2">
                <p>Non Commercial Mode</p>
                <p>Minimum Documentation</p>
                <p>All Service Providers</p>
              </div>
            </div>
          </div>
        </div>
        <div>
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-6 items-center">
                  <OrderFormComponent control={form.control} label="Invoice No." name="invoiceNo" />
                  {/* <OrderFormComponent control={form.control} label="Invoice Date" name="invoiceDate" /> */}
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
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground",
                                  )}
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
                                onChange={(value) => field.onChange(value)}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="font-normal text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <OrderFormComponent control={form.control} label="Order Id/Ref. Id" name="orderId" />
                </div>
                <div className="ml-6 my-6 w-1/4 pr-4">
                  <OrderFormComponent control={form.control} label="IOSS Number:" name="iossNumber" />
                </div>
              </div>

              <div>
                <div className="font-semibold text-lg mt-9 ml-4">Item Details</div>

                <ItemDetails form={form} />
              </div>

              <div className="mt-6 flex justify-between">
                <Button
                  type="submit"
                  className="px-4 py-2 mb-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button type="submit" className="px-4 py-2 mb-6 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
