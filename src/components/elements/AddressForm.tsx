import { CountryApi } from "../services/CountryApi";
import { StatesApi } from "../services/StatesApi";
import { FormComponent } from "./FormComponent";

export const AddressForm = ({ form, isBillingAddress = false }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-y-2 gap-x-4">
      <FormComponent name={isBillingAddress ? "address3" : "address1"} label="Address 1" control={form.control} />
      <FormComponent name={isBillingAddress ? "address4" : "address2"} label="Address 2" control={form.control} />
      <FormComponent name={isBillingAddress ? "mark" : "landmark"} label="Landmark" control={form.control} />
      <CountryApi name={isBillingAddress ? "Country" : "country"} control={form.control} />
      <StatesApi name={isBillingAddress ? "state1" : "state"} form={form} />
      <FormComponent name={isBillingAddress ? "city1" : "city"} label="City" control={form.control} />
      <FormComponent name={isBillingAddress ? "pincode1" : "pincode"} label="Pincode" control={form.control} />
    </div>
  );
};
