import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormComponent } from "./elements/FormComponent";

const formSchema = z.object({
  firstName: z.string().min(6, "The customer shipping first name is required."),
  first: z.string().min(6, "The customer billing first name is required."),
  lastName: z.string().min(6, "The customer shipping last name is required."),
  last: z.string().min(6, "The customer billing last name is required."),
  //   mobileNo: z.number().optional(),
  //   mobile:
  alternateMobile: z.number().optional(),
  //   email:z.string().
  country: z.string().min(1, "The customer shipping country code is required."),
  Country: z.string().min(1, "The customer shipping country code is required."),
  address1: z.string().min(9, "The customer shipping address 1 is required."),
  landmark: z.string().optional(),
  address2: z.string().min(9, "The customer shipping address 2 is required."),
  pincode: z.string().min(1, "The customer shipping postcode is required."),
  city: z.string().min(1, "The customer shipping city is required."),
  state: z.string().min(1, "The customer shipping state is required"),
  address3: z.string().min(9, "The customer billing address 1 is required."),
  address4: z.string().min(9, "The customer billing address 3 is required."),
  mark: z.string().min(9, "The customer billing address 2 is required."),
});

export const BuyerDetails = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",

      lastName: "",

      //   mobileNo: 0,
      //   mobile:"",
      alternateMobile: 0,
      //   email: "",
      country: "",
      Country: "",
      address1: "",
      landmark: "",
      address2: "",
      pincode: "",
      city: "",
      state: "",
      first: "",
      last: "",
      //   mobile: "",
      address3: "",
      address4: "",
      mark: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex lg:flex-row space-x-6">
      <div className=" bg-white rounded-md w-1/3">hello </div>
      <div className=" bg-white rounded-md w-2/3">
        <div className="h-48 bg-gray-50"></div>
        <hr />
        <div>
          <p className="font-semibold text-lg my-9 ml-6">Buyer Shipping Details</p>
          <div className="mb-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">
                <div className="grid grid-cols-3 space-x-5 my-5 ml-7 mr-20">
                  <FormComponent name="firstName" label="First Name" control={form.control} />
                  <FormComponent name="lastName" label="Last Name" control={form.control} />
                  <FormComponent name="mobileNo" label="Mobile No." control={form.control} />
                </div>
                <div className="grid grid-cols-4 space-x-5 my-5 ml-7 mr-20">
                  <FormComponent
                    name="alternateMobile"
                    label="Alternate Mobile No."
                    control={form.control}
                    className=""
                  />

                  <FormComponent name="email" label="Email Id" control={form.control} className="" />
                </div>
                <div className="my-5 ml-7 mr-20">
                  <FormComponent name="country" label="Country" control={form.control} />
                </div>
                <div className="grid grid-cols-2 space-x-4  my-5 ml-7 mr-20">
                  <FormComponent name="address1" label="Address 1" control={form.control} />
                  <FormComponent name="landmark" label="Landmark" control={form.control} />
                </div>
                <div className="my-5 ml-7 mr-20">
                  <FormComponent name="address2" label="Address 2" control={form.control} />
                </div>
                <div className="grid grid-cols-3 space-x-4  my-5 ml-7 mr-20">
                  <FormComponent name="pincode" label="Pincode" control={form.control} />
                  <FormComponent name="city" label="City" control={form.control} />
                  <FormComponent name="state" label="State" control={form.control} />
                </div>
                <div className="font-semibold text-lg my-9 ml-6">Buyer Billing Details</div>

                <div className="grid grid-cols-3 space-x-5 my-5 ml-7 mr-20">
                  <FormComponent name="first" label="First Name" control={form.control} />
                  <FormComponent name="last" label="Last Name" control={form.control} />
                  <FormComponent name="mobile" label="Mobile No." control={form.control} />
                </div>
                <div className="my-5 ml-7 mr-20">
                  <FormComponent name="Country" label="Country" control={form.control} />
                </div>
                <div className="grid grid-cols-2 space-x-5 my-5 ml-7 mr-20">
                  <FormComponent name="address3" label="Address 1" control={form.control} />
                  <FormComponent name="mark" label="Landmark" control={form.control} />
                </div>
                <div className="my-5 ml-7 mr-20">
                  <FormComponent name="address4" label="Address 2" control={form.control} />
                </div>
                <Button type="submit" className="mt-2 bg-black text-white">
                  Continue
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
