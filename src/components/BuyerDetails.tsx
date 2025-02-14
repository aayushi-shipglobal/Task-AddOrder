import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormComponent } from "./elements/FormComponent";
import { useEffect, useState } from "react";
import { StepperSidebar } from "./elements/StepperSidebar";
import { CountryApi } from "./elements/CountryApi";
import { StatesApi } from "./elements/StatesApi";
import { ComboBox } from "./elements/ComboBox";
import { Check } from "lucide-react";

const formSchema = z.object({
  pickupAddress:z.string().min(1, "Pickup Address is required."),
  firstName: z.string().min(1, "The customer shipping first name is required."),
  first: z.string().min(1, "The customer billing first name is required."),
  lastName: z.string().min(1, "The customer shipping last name is required."),
  last: z.string().min(1, "The customer billing last name is required."),
  mobileNo: z.string().optional(),
  mobile: z.string().optional(),
  alternateMobile: z.string().optional(),
  email: z.string(),
  country: z.string().optional(),
  state:z.string().min(1, "The customer shipping state is required"),
  Country: z.string().optional(),
  address1: z.string().min(9, "The customer shipping address 1 is required."),
  landmark: z.string().optional(),
  address2: z.string().min(9, "The customer shipping address 2 is required."),
  pincode: z.string().min(1, "The customer shipping postcode is required."),
  city: z.string().min(1, "The customer shipping city is required."),
  // state: z.string().optional(),
  address3: z.string().min(9, "The customer billing address 1 is required."),
  address4: z.string().min(9, "The customer billing address 3 is required."),
  mark: z.string().optional(),
  pincode1: z.string().min(1, "The customer billing postcode is required."),
  city1: z.string().min(1, "The customer billing city is required."),
  state1: z.string().min(1, "The customer billing state is required"),
});

type buyerDetailsProps={
  nextStep:any;
  setActiveStep:any;
  activeStep:any;
  buyerDetails:any;
}
export const BuyerDetails = ({ nextStep, setActiveStep, activeStep, buyerDetails }:buyerDetailsProps) => {
  const [checked, setChecked] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupAddress:"",
      firstName: "",
      lastName: "",
      mobileNo: "",
      mobile: "",
      alternateMobile: "",
      email: "",
      country: "",
      state: "",
      Country: "",
      address1: "",
      landmark: "",
      address2: "",
      pincode: "",
      city: "",
      first: "",
      last: "",
      address3: "",
      address4: "",
      mark: "",
      pincode1: "",
      city1: "",
      state1:"",
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("buyerFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        form.setValue(key as keyof z.infer<typeof formSchema>, parsedData[key]);
      });
    }
  }, [form]);

  useEffect(() => {
    if (checked) {
      form.setValue("first", form.getValues("firstName"));
      form.setValue("last", form.getValues("lastName"));
      form.setValue("address3", form.getValues("address1"));
      form.setValue("address4", form.getValues("address2"));
      form.setValue("mark", form.getValues("landmark"));
      form.setValue("pincode1", form.getValues("pincode"));
      form.setValue("city1", form.getValues("city"));
      form.setValue("state1", form.getValues("state"));


    } else {
      form.setValue("first", "");
      form.setValue("last", "");
      form.setValue("address3", "");
      form.setValue("address4", "");
      form.setValue("mark", "");
      form.setValue("pincode1", "");
      form.setValue("city1", "");
      form.setValue("state1", "");
    }
  }, [checked, form]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedBuyerDetails = {
      ...buyerDetails,
      ...values,
    };

    console.log(updatedBuyerDetails, "Updated Buyer Details");
    localStorage.setItem("buyerFormData", JSON.stringify(updatedBuyerDetails));

    nextStep(updatedBuyerDetails);
  }

  const frameworks = [
    {
      value: "option1",
      label: "option1",
    },
    {
      value: "option2",
      label: "option2",
    },
  ];

  return (
    <div className="lg:flex lg:flex-row lg:space-x-6 lg:justify-center py-12 lg:px-12 px-6">
      <StepperSidebar setActiveStep={setActiveStep} activeStep={activeStep} />
      <div className=" bg-white rounded-md lg:w-2/3 pt-3">
        <div className="mb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="lg:space-y-8 text-black">
              <div className="my-10 bg-white">
                <p className="font-semibold text-lg my-9 ml-6 ">
                  Select Pickup Address<span className="text-red-500">*</span>
                </p>

                <div className="mx-4 lg:ml-6 lg:mr-16">
                  <FormField
                    control={form.control}
                    name="pickupAddress"
                    render={({ field }) => (
                      <FormItem>
                        <ComboBox
                          {...field}
                          label="Select Pickup Address"
                          frameworks={frameworks}
                          placeholder="Select Pickup Address"
                        />
                        <FormMessage className="font-normal text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <hr />
              <p className="font-semibold text-lg my-9 ml-4 lg:ml-6">Buyer Shipping Details</p>

              <div className="grid lg:grid-cols-3 space-y-2 lg:space-y-0 lg:space-x-5 my-5 lg:ml-7 lg:mr-20 mx-4">
                <FormComponent name="firstName" label="First Name" control={form.control} />
                <FormComponent name="lastName" label="Last Name" control={form.control} />
                <FormComponent name="mobileNo" label="Mobile No." control={form.control} />
              </div>
              <div className="grid lg:grid-cols-3 space-y-2 -mt-2 lg:space-y-0 lg:space-x-5 lg:my-5 mx-4 lg:ml-7 lg:mr-20">
                <div className="lg:col-span-1">
                  <FormComponent name="alternateMobile" label="Alternate Mobile No." control={form.control} />
                </div>

                <div className="lg:col-span-2">
                  <FormComponent name="email" label="Email Id" control={form.control} />
                </div>
              </div>
              <div className="my-5 lg:ml-7 lg:mr-20 mx-4">
                <CountryApi name="country" control={form.control} />
              </div>
              <div className="grid lg:grid-cols-2 space-y-2 lg:space-y-0  lg:space-x-4  my-5 lg:ml-7 lg:mr-20 mx-4">
                <FormComponent name="address1" label="Address 1" control={form.control} />
                <FormComponent name="landmark" label="Landmark" control={form.control} />
              </div>
              <div className="my-5 lg:ml-7 lg:mr-20 mx-4">
                <FormComponent name="address2" label="Address 2" control={form.control} />
              </div>
              <div className="grid lg:grid-cols-3 space-y-2 lg:space-y-0  lg:space-x-4  my-5 lg:ml-7 lg:mr-20 mx-4 items-center">
                <FormComponent name="pincode" label="Pincode" control={form.control} />
                <FormComponent name="city" label="City" control={form.control} />

                <div className="my-5 lg:ml-7">
                  <StatesApi name="state" form={form} />
                </div>
              </div>
              <div
                className="flex items-center lg:ml-6 my-6 mx-4 cursor-pointer lg:w-1/2"
                onClick={() => {
                  setChecked(!checked);
                }}
              >
                <div
                  className={`w-5 h-5 border border-gray-100 flex items-center justify-center rounded-md ${
                    checked ? "bg-blue-500" : "bg-white"
                  }`}
                >
                  {checked && <Check className="text-white size-4" />}
                </div>
                <p className="ml-3 text-sm font-medium">Shipping & Billing Address are same.</p>
              </div>
              {!checked && (
                <div>
                  <div className="font-semibold text-lg my-9 ml-4 lg:ml-6">Buyer Billing Details</div>

                  <div className="grid lg:grid-cols-3 space-y-2 lg:space-y-0 lg:space-x-5 my-5 lg:ml-7 lg:mr-20 mx-4">
                    <FormComponent name="first" label="First Name" control={form.control} />
                    <FormComponent name="last" label="Last Name" control={form.control} />
                    <FormComponent name="mobile" label="Mobile No." control={form.control} />
                  </div>
                  <div className="my-5 lg:ml-7 lg:mr-20 mx-4">
                    <CountryApi name="Country" control={form.control} />
                  </div>
                  <div className="grid lg:grid-cols-2 space-y-2 lg:space-y-0 lg:space-x-4  my-5 lg:ml-7 lg:mr-20 mx-4">
                    <FormComponent name="address3" label="Address 1" control={form.control} />
                    <FormComponent name="mark" label="Landmark" control={form.control} />
                  </div>
                  <div className="my-5 lg:ml-7 lg:mr-20 mx-4">
                    <FormComponent name="address4" label="Address 2" control={form.control} />
                  </div>
                  <div className="grid lg:grid-cols-3 space-y-2 lg:space-y-0 lg:space-x-4  my-5 lg:ml-7 lg:mr-20 mx-4 items-center">
                    <FormComponent name="pincode1" label="Pincode" control={form.control} />
                    <FormComponent name="city1" label="City" control={form.control} />
                    <div className="my-5 lg:ml-7">
                      <StatesApi name="state1" form={form} />
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-6 flex justify-end mr-10">
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
