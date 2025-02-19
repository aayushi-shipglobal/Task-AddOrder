import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateChecked } from "../redux/addOrderSlice";
import { Form } from "@/components/ui/form";
import { FormComponent } from "../elements/FormComponent";
import { useEffect } from "react";
import { Check } from "lucide-react";
import { updateBuyerDetails, updateStep } from "../redux/addOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { buyerSchema } from "../schemas/ValidationSchemas";
import { ButtonComp } from "../elements/ButtonComp";
import { AddressForm } from "../elements/AddressForm";

export const BuyerDetails = () => {
  const checked = useSelector((state: RootState) => state.addOrder.buyerDetailsData.checked);
  const dispatch = useDispatch();
  const buyerDetails = useSelector((state: RootState) => state.addOrder.buyerDetailsData);

  const form = useForm<z.infer<typeof buyerSchema>>({
    resolver: zodResolver(buyerSchema),
    defaultValues: buyerDetails,
  });

  useEffect(() => {
    const addressFields = [
      { shipping: "address1", billing: "address3" },
      { shipping: "address2", billing: "address4" },
      { shipping: "landmark", billing: "mark" },
      { shipping: "pincode", billing: "pincode1" },
      { shipping: "city", billing: "city1" },
      { shipping: "state", billing: "state1" },
      { shipping: "country", billing: "Country" },
    ];
    addressFields.forEach(({ shipping, billing }) => {
      if (checked) {
        const shippingValue = form.getValues(shipping);
        form.setValue(billing, shippingValue);
      } else {
        form.setValue(billing, "");
      }
    });
  }, [checked, form]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateChecked(e.target.checked));
  };

  const onSubmit = (values: z.infer<typeof buyerSchema>) => {
    dispatch(updateBuyerDetails(values));
    dispatch(updateStep(3));
  };

  return (
    <div className="px-3 md:px-7 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">
          <p className="text-base font-bold mb-2">Personal Details</p>
          <div className="grid lg:grid-cols-3 gap-y-2 gap-x-4">
            <FormComponent
              name="firstName"
              label="First Name"
              control={form.control}
              placeholder="Enter First Name..."
            />
            <FormComponent name="lastName" label="Last Name" control={form.control} placeholder="Enter Last Name..." />
            <FormComponent
              name="mobileNo"
              label="Mobile No."
              control={form.control}
              placeholder="Enter Mobile Number..."
            />
            <FormComponent name="email" label="Email Id" control={form.control} placeholder="Enter Email ID..." />
          </div>

          <p className="text-base font-bold mb-2 mt-6">Shipping Address</p>
          <AddressForm form={form} />

          <div
            className="flex items-center my-6 cursor-pointer lg:w-1/2"
            onClick={() => handleCheckboxChange({ target: { checked: !checked } })}
          >
            <div
              className={`w-5 h-5 border border-gray-100 flex items-center justify-center rounded-md ${
                checked ? "bg-blue-500" : "bg-white"
              }`}
            >
              {checked && <Check className="text-white size-4" />}
            </div>
            <p className="ml-3 text-sm font-medium">Billing Address is same as Shipping Address.</p>
          </div>

          {!checked && (
            <div>
              <p className="font-bold text-base">Billing Address</p>
              <AddressForm form={form} isBillingAddress={true} />
            </div>
          )}

          <ButtonComp />
        </form>
      </Form>
    </div>
  );
};
