import { RootState } from "@/store";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { BuyerData } from "@/assets/interface/interface";
import { ButtonComp } from "@/components/elements/ButtonComp";
import { AddressForm } from "@/components/elements/AddressForm";
import { updateChecked } from "@/components/redux/addOrderSlice";
import { buyerSchema } from "@/components/schemas/ValidationSchemas";
import { BuyerComponent } from "@/components/elements/BuyerComponent";
import { updateBuyerDetails, updateStep } from "@/components/redux/addOrderSlice";

export const BuyerDetails = () => {
  const dispatch = useDispatch();
  const buyerDetails = useSelector((state: RootState) => state.addOrder.buyerDetailsData);
  const checked = useSelector((state: RootState) => state.addOrder.buyerDetailsData.checked);

  const buyerDataSchema = buyerSchema(checked);

  const form = useForm<BuyerData>({
    resolver: zodResolver(buyerDataSchema),
    defaultValues: buyerDetails,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateChecked(e.target.checked));
  };

  const onSubmit = (values:BuyerData) => {
    dispatch(updateBuyerDetails(values));
    dispatch(updateStep(3));
  };
  return (
    <div className="px-3 md:px-7 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">
          <p className="text-base font-bold mb-2">Personal Details</p>
          <BuyerComponent form={form} />
          <p className="text-base font-bold mb-2 mt-6">Shipping Address</p>
          <AddressForm form={form} isBillingAddress={false} />
            <div className="items-top flex my-6 space-x-2 cursor-pointer">
              <Checkbox id="terms1" checked={checked} onClick={() => handleCheckboxChange({ target: { checked: !checked } })} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0.5 cursor-pointer"
                >
                  Billing Address is same as Shipping Address.
                </label>
              </div>
            </div>
          {!checked && (
            <div>
              <p className="font-bold text-base mb-1">Billing Address</p>
              <AddressForm form={form} isBillingAddress={true} />
            </div>
          )}
          <div className="py-3">
            <ButtonComp />
          </div>
        </form>
      </Form>
    </div>
  );
};
