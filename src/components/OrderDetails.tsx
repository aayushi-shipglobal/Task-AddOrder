import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ShipmentDetailsComponent } from "./elements/ShipmentDetailsComponent";
import { OrderFormComponent } from "./elements/OrderFormComponent";
import * as React from "react";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderDetails } from "../reducer/orderSlice";
import { format } from "date-fns";
import { CalendarIcon, FilePenLine, UserRoundCheck } from "lucide-react";
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  items: z.array(
    z.object({
      productName: z.string().min(2, "Product Title is required."),
      sku: z.string().optional(),
      hsn: z.string().min(2, "HSN is required."),
      qty: z.number().min(2, "Product Qty is required."),
      unitPrice: z.number().min(2, "Product Price is required."),
      igst: z.string(),
    }),
  ),
});
import { StepperSidebar } from "./elements/StepperSidebar";
import { ComboboxDemo } from "./elements/ComboboxDemo";
import ItemDetails from "./elements/ItemDetails";
import { RootState } from "@/store";

export const OrderDetails = ({ nextStep, prevStep  }) => {
  const [date, setDate] = React.useState<Date>();
  const dispatch = useDispatch();
  const currentorderDetails = useSelector((state: RootState) => state.order.orderDetails);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentorderDetails
    // {
    //   actualWeight: 0,
    //   length: 0,
    //   breadth: 0,
    //   height: 0,
    //   invoiceNo: "",
    //   invoiceDate: "",
    //   invoiceCurrency: "",
    //   orderId: "",
    //   iossNumber: "",
    //   items: [
    //     {
    //       productName: "",
    //       sku: "",
    //       hsn: "",
    //       qty: 0,
    //       unitPrice: 0,
    //       igst: "0",
    //     },
    //   ],
    // },
  });

  // useEffect(() => {
  //   const savedData = localStorage.getItem("orderFormData");
  //   if (savedData) {
  //     const parsedData = JSON.parse(savedData);
  
  //     parsedData.actualWeight = Number(parsedData.actualWeight);
  //     parsedData.length = Number(parsedData.length);
  //     parsedData.breadth = Number(parsedData.breadth);
  //     parsedData.height = Number(parsedData.height);
  
  //     parsedData.items = parsedData.items.map((item:any) => ({
  //       ...item,
  //       qty: Number(item.qty),
  //       unitPrice: Number(item.unitPrice),
       
  //     }));
  
  //     Object.keys(parsedData).forEach((key) => {
  //       form.setValue(key as keyof z.infer<typeof formSchema>, parsedData[key]);
  //     });
  //   }
  // }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(updateOrderDetails(values)); 
    nextStep(values);
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
    <div className="lg:flex lg:flex-row lg:space-x-6 lg:justify-center py-12 lg:px-12 px-6">
      {" "}
      <StepperSidebar/>
      <div className="bg-white rounded-md lg:w-2/3 px-6 pt-3">
        <div className="font-semibold text-lg mt-9 ml-6 mb-2">Shipment Type</div>
        <p className="text-gray-400 text-sm font-semibold ml-6 mb-4">
          Please select the shipment Mode. Note: CSB-V Shipments can only be sent through ShipGlobal Direct. If other
          partner services are needed please select CSB IV.
        </p>
        <p className="text-gray-500 ml-6 font-medium">
          If you need more info, please call/whatsapp at
          <span className="text-blue-500 cursor-pointer">+91 9811098919.</span>
        </p>
        <div className="grid lg:grid-cols-2 mx-10 gap-6 lg:space-x-4 mt-6 cursor-pointer">
          <div className="border border-dashed border-blue-300 bg-blue-100 rounded-md py-4">
            <p className="font-bold text-center mb-4">CSB IV</p>
            <div className="flex flex-row gap-x-5 lg:gap-x-10 items-center ml-12">
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
            <div className="flex flex-row gap-x-5 lg:gap-x-10 items-center ml-11">
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
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ml-6">
                <ShipmentDetailsComponent control={form.control} name="actualWeight" label="Actual Weight" unit="KG" />
                <ShipmentDetailsComponent control={form.control} name="length" label="Length" unit="CM" />
                <ShipmentDetailsComponent control={form.control} name="breadth" label="Breadth" unit="CM" />
                <ShipmentDetailsComponent control={form.control} name="height" label="Height" unit="CM" />
              </div>

              <div>
                <div className="font-semibold text-lg mt-9 ml-6">Order Details</div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ml-6 items-center">
                  <OrderFormComponent control={form.control} label="Invoice No." name="invoiceNo" />
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
                                onChange={(value) => field.onChange(value)} placeholder={""}                              />
                            </div>
                          </FormControl>
                          <FormMessage className="font-normal text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <OrderFormComponent control={form.control} label="Order Id/Ref. Id" name="orderId" />
                </div>
                <div className="ml-6 my-6 lg:w-1/4 lg:pr-4">
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