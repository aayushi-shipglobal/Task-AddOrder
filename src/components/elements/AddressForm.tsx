import { CountryApi } from "../services/CountryApi";
import { StatesApi } from "../services/StatesApi";
import { FormComponent } from "./FormComponent";

export const AddressForm = ({ form, isBillingAddress = false }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-y-2 gap-x-4">
      <FormComponent name={isBillingAddress ? "address3" : "address1"} label="Address 1" form={form} />
      <FormComponent name={isBillingAddress ? "address4" : "address2"} label="Address 2" form={form} />
      <FormComponent name={isBillingAddress ? "mark" : "landmark"} label="Landmark" form={form} />
      <CountryApi name={isBillingAddress ? "Country" : "country"} form={form} />
      <StatesApi name={isBillingAddress ? "state1" : "state"} form={form} />
      <FormComponent name={isBillingAddress ? "city1" : "city"} label="City" form={form} />
      <FormComponent name={isBillingAddress ? "pincode1" : "pincode"} label="Pincode" form={form} />
    </div>
  );
};
