import { CountryApi } from "@/components/service/CountryApi";
import { StatesApi } from "@/components/service/StatesApi";
import { StatesApiBilling } from "@/components/service/StatesApiBilling";
import { FormComponent } from "@/components/elements/FormComponent";

export const AddressForm = ({ form, isBillingAddress }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-y-2 gap-x-4">
      <FormComponent name={isBillingAddress ? "address3" : "address1"} label="Address 1" form={form} />
      <FormComponent name={isBillingAddress ? "address4" : "address2"} label="Address 2" form={form} />
      <FormComponent name={isBillingAddress ? "mark" : "landmark"} label="Landmark" form={form} />
      <CountryApi name={isBillingAddress ? "Country" : "country"} form={form} label="Country" />
      {isBillingAddress ? <StatesApiBilling name="state1" form={form} /> : <StatesApi name="state" form={form} />}
      <FormComponent name={isBillingAddress ? "city1" : "city"} label="City" form={form} />
      <FormComponent name={isBillingAddress ? "pincode1" : "pincode"} label="Pincode" form={form} />
    </div>
  );
};
