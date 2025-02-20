import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ShipmentDetailsComponent } from "../elements/ShipmentDetailsComponent";
import { OrderFormComponent } from "../elements/OrderFormComponent";
import * as React from "react";
import { updateOrderDetails, updateStep } from "../redux/addOrderSlice";
import { Button } from "@/components/ui/button";
import ItemDetails from "../elements/ItemDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { orderSchema } from "../schemas/ValidationSchemas";
import { validateOrderInvoice } from "../services/Services";
import { useEffect } from "react";
import DatePicker from "../elements/DatePicker";
import CurrencySelect from "../elements/CurrencySelect";

const frameworks = [
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "INR", label: "INR" },
  { value: "SAR", label: "SAR" },
  { value: "USD", label: "USD" },
];

export const OrderDetails = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useDispatch();
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

  useEffect(() => {
    const payload = {
      csbv: "0",
      currency_code: orderDetails.invoiceCurrency,
      package_breadth: Number(orderDetails.breadth),
      package_height: Number(orderDetails.height),
      package_length: Number(orderDetails.length),
      package_weight: Number(orderDetails.actualWeight),
      vendor_order_item: itemDetails.map((item: any) => ({
        vendor_order_item_name: item.productName,
        vendor_order_item_sku: item.sku,
        vendor_order_item_hsn: item.hsn,
        vendor_order_item_quantity: Number(item.qty),
        vendor_order_item_unit_price: Number(item.unitPrice),
        vendor_order_item_tax_rate: item.igst,
      })),
    };

    const validateOrder = async (orderDetails:any, itemDetails:any) => {
      try {
        const result = await validateOrderInvoice(payload);

        if (result.data?.box?.["1"]?.exceeds_limit) {
          setErrorMessage(result.data.box["1"].exceeds_text);
          setError(true);
        } else {
          setErrorMessage("");
          setError(false);
        }
      } catch (error: any) {
        setErrorMessage(error.message || "There was an error while validating the order.");
        setError(true);
      }
    };

  validateOrder(orderDetails, itemDetails);
  }, [orderDetails, itemDetails]);

  const onSubmit = async (values: z.infer<typeof orderSchema>) => {
    const isValid = await validateInvoice(orderDetails, itemDetails);

    if (!isValid) {
      return;
    }
    dispatch(updateOrderDetails(values));
    dispatch(updateStep(4));
  };

  return (
    <div className="px-3 md:px-7 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-2 gap-x-4">
            <OrderFormComponent
              control={form.control}
              label="Invoice No."
              name="invoiceNo"
            />
            <DatePicker
              control={form.control}
              name="invoiceDate"
              label="Invoice Date"
              date={date}
              setDate={setDate}
             
            />

            <CurrencySelect
              control={form.control}
              name="invoiceCurrency"
              frameworks={frameworks}
              label="Invoice Currency"
              placeholder="INR"
            />

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
