import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormComponent } from "./elements/FormComponent";
import { useEffect, useState } from "react";
import { ComboboxDemo } from "@/components/elements/ComboboxDemo";
import { StepperSidebar } from "./elements/StepperSidebar";
import { CountryApi } from "./elements/CountryApi";

const formSchema = z.object({
  firstName: z.string().min(1, "The customer shipping first name is required."),
  first: z.string().min(1, "The customer billing first name is required."),
  lastName: z.string().min(1, "The customer shipping last name is required."),
  last: z.string().min(1, "The customer billing last name is required."),
  mobileNo: z.string().optional(),
  mobile: z.string().optional(),
  alternateMobile: z.string().optional(),
  email: z.string(),
  country: z.string().optional(),
  Country: z.string().optional(),
  address1: z.string().min(9, "The customer shipping address 1 is required."),
  landmark: z.string().optional(),
  address2: z.string().min(9, "The customer shipping address 2 is required."),
  pincode: z.string().min(1, "The customer shipping postcode is required."),
  city: z.string().min(1, "The customer shipping city is required."),
  state: z.string().optional(),
  address3: z.string().min(9, "The customer billing address 1 is required."),
  address4: z.string().min(9, "The customer billing address 3 is required."),
  mark: z.string().optional(),
  pincode1: z.string().min(1, "The customer billing postcode is required."),
  city1: z.string().min(1, "The customer billing city is required."),
  // state1: z.string().min(1, "The customer billing state is required"),
});

export const BuyerDetails = ({ nextStep }) => {
  const [checked, setChecked] = useState(true);
  const [states, setStates] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });

  const countrySelected = form.getValues("country");

  useEffect(() => {
    if (countrySelected) {
      const fetchStates = async () => {
        try {
          const response = await fetch(`https://api.fr.stg.shipglobal.in/api/v1/location/states`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              state_country_code: countrySelected,
            }),
          });
          const result = await response.json();
          console.log(result);
          if (result.data && result.data.states) {
            const formattedStates = result.data.states.map((state: any) => ({
              value: state.state_name,
              label: state.state_name,
            }));
            setStates(formattedStates);
          }
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };
      fetchStates();
    }
  }, [countrySelected]);

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
    } else {
      form.setValue("first", "");
      form.setValue("last", "");
      form.setValue("address3", "");
      form.setValue("address4", "");
      form.setValue("mark", "");
      form.setValue("pincode1", "");
      form.setValue("city1", "");
    }
  }, [checked, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "values");
    localStorage.setItem("buyerFormData", JSON.stringify(values));
    nextStep();
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

  // const states = [
  //   { value: "AndhraPradesh", label: "Andhra Pradesh" },
  //   { value: "ArunachalPradesh", label: "Arunachal Pradesh" },
  //   { value: "Assam", label: "Assam" },
  //   { value: "Bihar", label: "Bihar" },
  //   { value: "Chhattisgarh", label: "Chhattisgarh" },
  //   { value: "Goa", label: "Goa" },
  //   { value: "Gujarat", label: "Gujarat" },
  //   { value: "Haryana", label: "Haryana" },
  //   { value: "HimachalPradesh", label: "Himachal Pradesh" },
  //   { value: "Jharkhand", label: "Jharkhand" },
  //   { value: "Karnataka", label: "Karnataka" },
  //   { value: "Kerala", label: "Kerala" },
  //   { value: "MadhyaPradesh", label: "Madhya Pradesh" },
  //   { value: "Maharashtra", label: "Maharashtra" },
  //   { value: "Manipur", label: "Manipur" },
  //   { value: "Meghalaya", label: "Meghalaya" },
  //   { value: "Mizoram", label: "Mizoram" },
  //   { value: "Nagaland", label: "Nagaland" },
  //   { value: "Odisha", label: "Odisha" },
  //   { value: "Punjab", label: "Punjab" },
  //   { value: "Rajasthan", label: "Rajasthan" },
  // ];

  return (
    <div className="flex lg:flex-row space-x-6 justify-center py-12 px-28">
      <StepperSidebar />
      <div className=" bg-white rounded-md w-2/3 ">
        <div className="my-10 bg-white">
          <p className="font-semibold text-lg my-9 ml-6">
            Select Pickup Address<span className="text-red-500">*</span>
          </p>
          <div className="ml-6 mr-16">
            <ComboboxDemo label="Select Pickup Address" frameworks={frameworks} placeholder="Select Pickup Address" />
          </div>
        </div>
        <hr />
        <div>
          <p className="font-semibold text-lg my-9 ml-6">Buyer Shipping Details</p>
          <div className="mb-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-black">
                <div className="grid grid-cols-3 space-x-5 my-5 ml-7 mr-20">
                  <FormComponent name="firstName" label="First Name" control={form.control} />
                  <FormComponent name="lastName" label="Last Name" control={form.control} />
                  <FormComponent name="mobileNo" label="Mobile No." control={form.control} />
                </div>
                <div className="grid grid-cols-3 space-x-5 my-5 ml-7 mr-20">
                  <div className="col-span-1">
                    <FormComponent name="alternateMobile" label="Alternate Mobile No." control={form.control} />
                  </div>

                  <div className="col-span-2">
                    {" "}
                    <FormComponent name="email" label="Email Id" control={form.control} />
                  </div>
                </div>
                <div className="my-5 ml-7 mr-20">
                  <CountryApi name="country" control={form.control} />
                </div>
                <div className="grid grid-cols-2 space-x-4  my-5 ml-7 mr-20">
                  <FormComponent name="address1" label="Address 1" control={form.control} />
                  <FormComponent name="landmark" label="Landmark" control={form.control} />
                </div>
                <div className="my-5 ml-7 mr-20">
                  <FormComponent name="address2" label="Address 2" control={form.control} />
                </div>
                <div className="grid grid-cols-3 space-x-4  my-5 ml-7 mr-20 items-center">
                  <FormComponent name="pincode" label="Pincode" control={form.control} />
                  <FormComponent name="city" label="City" control={form.control} />
                  <div className="space-y-2">
                    <Label className="text-gray-700 ">
                      State<span className="text-red-500">*</span>
                    </Label>

                    <ComboboxDemo
                      label="Select State"
                      frameworks={states}
                      placeholder="Select State"
                      
                    />
                    
                  </div>
                </div>
                <div className="flex items-center ml-6 my-6">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="w-6 h-6 border border-gray-700"
                  />
                  <p className="ml-3 text-sm font-medium">Shipping & Billing Address are same.</p>
                </div>
                {!checked && (
                  <div>
                    <div className="font-semibold text-lg my-9 ml-6">Buyer Billing Details</div>

                    <div className="grid grid-cols-3 space-x-5 my-5 ml-7 mr-20">
                      <FormComponent name="first" label="First Name" control={form.control} />
                      <FormComponent name="last" label="Last Name" control={form.control} />
                      <FormComponent name="mobile" label="Mobile No." control={form.control} />
                    </div>
                    <div className="my-5 ml-7 mr-20">
                      <CountryApi name="Country" control={form.control} />
                    </div>
                    <div className="grid grid-cols-2 space-x-5 my-5 ml-7 mr-20">
                      <FormComponent name="address3" label="Address 1" control={form.control} />
                      <FormComponent name="mark" label="Landmark" control={form.control} />
                    </div>
                    <div className="my-5 ml-7 mr-20">
                      <FormComponent name="address4" label="Address 2" control={form.control} />
                    </div>
                    <div className="grid grid-cols-3 space-x-4  my-5 ml-7 mr-20 items-center">
                      <FormComponent name="pincode1" label="Pincode" control={form.control} />
                      <FormComponent name="city1" label="City" control={form.control} />
                      <div className="space-y-2">
                        <Label className="text-gray-700 ">
                          State<span className="text-red-500">*</span>
                        </Label>

                        <ComboboxDemo label="Select State" frameworks={states} placeholder="Select State" />
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
    </div>
  );
};
