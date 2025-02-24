import { z } from "zod";
import * as React from "react";
import { RootState } from "@/store";
import { useForm } from "react-hook-form";
import { frameworks } from "../array/array";
import { Form } from "@/components/ui/form";
import DatePicker from "../elements/DatePicker";
import { Button } from "@/components/ui/button";
import ItemDetails from "../elements/ItemDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import CurrencySelect from "../elements/CurrencySelect";
import { validateOrderInvoice } from "../service/Services";
import { orderSchema } from "../schemas/ValidationSchemas";
import { OrderFormComponent } from "../elements/OrderFormComponent";
import { updateOrderDetails, updateStep } from "../redux/addOrderSlice";
import { ShipmentDetailsComponent } from "../elements/ShipmentDetailsComponent";

export const OrderDetails = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = React.useState("");
  const orderDetails = useSelector((state: RootState) => state.addOrder.orderDetailsData);

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: orderDetails,
  });

  const itemDetails = (form.getValues("items") || []).map((item: any, index: any) => ({
    productName: form.watch(`items.${index}.productName`),
    sku: form.watch(`items.${index}.sku`),
    hsn: form.watch(`items.${index}.hsn`),
    qty: form.watch(`items.${index}.qty`),
    unitPrice: form.watch(`items.${index}.unitPrice`),
    igst: form.watch(`items.${index}.igst`),
  }));

  const onSubmit = async (values: z.infer<typeof orderSchema>) => {
    if (!orderDetails || !itemDetails) return;

    try {
      const result = await validateOrderInvoice(orderDetails, itemDetails);

      if (result.data?.box?.["1"]?.exceeds_limit) {
        setErrorMessage(result.data.box["1"].exceeds_text);
        return;
      } else {
        setErrorMessage("");
      }
      dispatch(updateOrderDetails(values));
      dispatch(updateStep(4));
    } catch (error: any) {
      setErrorMessage(error.message || "There was an error while validating the order.");
    }
  };

  return (
    <div className="px-3 md:px-7 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-2 gap-x-4">
            <OrderFormComponent control={form.control} label="Invoice No." name="invoiceNo" />
            <DatePicker control={form.control} name="invoiceDate" label="Invoice Date" date={date} setDate={setDate} />
            <CurrencySelect
              control={form.control}
              name="invoiceCurrency"
              frameworks={frameworks}
              label="Invoice Currency"
              placeholder="INR"
            />
            <OrderFormComponent control={form.control} label="Order/Reference ID" name="orderId" />
            <OrderFormComponent control={form.control} label="IOSS Number:" name="iossNumber" />
          </div>
          <p className="text-base font-bold mt-6 mb-2">Box Measurements</p>
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
            <ItemDetails form={form} errorMessage={errorMessage} />
          </div>
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              className="bg-blue-800 text-sm font-medium text-white rounded-md px-4 py-2 hover:bg-blue-800/90"
            >
              Select Shipping
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
