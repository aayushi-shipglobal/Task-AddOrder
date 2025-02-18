import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormComponent } from "./elements/FormComponent";
import { useEffect, useState } from "react";
import { CountryApi } from "./elements/CountryApi";
import { StatesApi } from "./elements/StatesApi";
import { Check } from "lucide-react";
import { updateBuyerData, updateStep } from "./redux/addOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { buyerSchema } from "./schemas/ValidationSchemas";

export const BuyerDetails = () => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const buyerDetails = useSelector((state: RootState) => state.addOrder.buyerDetailsData);

  const form = useForm<z.infer<typeof buyerSchema>>({
    resolver: zodResolver(buyerSchema),
    defaultValues: buyerDetails,
  });

  useEffect(() => {
    if (checked) {
      form.setValue("address3", form.getValues("address1"));
      form.setValue("address4", form.getValues("address2"));
      form.setValue("mark", form.getValues("landmark"));
      form.setValue("pincode1", form.getValues("pincode"));
      form.setValue("city1", form.getValues("city"));
      form.setValue("state1", form.getValues("state"));
      form.setValue("Country",form.getValues("country"));
    } else {
      form.setValue("address3", "");
      form.setValue("address4", "");
      form.setValue("mark", "");
      form.setValue("pincode1", "");
      form.setValue("city1", "");
      form.setValue("state1", "");
      form.setValue("Country", "");
    }
  }, [checked, form]);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted", values);
    dispatch(updateBuyerData(values));
    dispatch(updateStep(3));
  }

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

          <div className="grid lg:grid-cols-3 gap-y-2 gap-x-4">
            <FormComponent name="address1" label="Address 1" control={form.control} placeholder="Enter Address 1..." />
            <FormComponent name="address2" label="Address 2" control={form.control} placeholder="Enter Address 2..." />
            <FormComponent name="landmark" label="Landmark" control={form.control} placeholder="Enter Landmark..." />

            <CountryApi name="country" control={form.control} />
            <StatesApi name="state" form={form} />
            <FormComponent name="city" label="City" control={form.control} placeholder="Enter City..." />
            <FormComponent name="pincode" label="Pincode" control={form.control} placeholder="Enter Pincode" />
          </div>
          <div
            className="flex items-center my-6 cursor-pointer lg:w-1/2"
            onClick={() => {
              setChecked(!checked);
            }}
            onChange={handleCheckboxChange}
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

              <div className="grid lg:grid-cols-3 gap-y-2 gap-x-4">
                <FormComponent name="address3" label="Address 1" control={form.control} />
                <FormComponent name="address4" label="Address 2" control={form.control} />

                <FormComponent name="mark" label="Landmark" control={form.control} />
                <CountryApi name="Country" control={form.control} />
                <StatesApi name="state1" form={form} />
                <FormComponent name="city1" label="City" control={form.control} />
                <FormComponent name="pincode1" label="Pincode" control={form.control} />
              </div>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-800 text-sm font-medium text-white rounded-md px-4 py-2 hover:bg-blue-800/90"
            >
              Continue
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
