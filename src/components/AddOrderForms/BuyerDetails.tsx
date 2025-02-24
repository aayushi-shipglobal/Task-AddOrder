import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import { z } from "zod";
import { updateChecked } from "../redux/addOrderSlice";
import { Form } from "@/components/ui/form";
import { Check } from "lucide-react";
import { updateBuyerDetails, updateStep } from "../redux/addOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { buyerSchema } from "../schemas/ValidationSchemas";
import { ButtonComp } from "../elements/ButtonComp";
import { AddressForm } from "../elements/AddressForm";
import { BuyerComponent } from "../elements/BuyerComponent";


export const BuyerDetails = () => {
  const checked = useSelector((state: RootState) => state.addOrder.buyerDetailsData.checked);
  const dispatch = useDispatch();
  const buyerDetails = useSelector((state: RootState) => state.addOrder.buyerDetailsData);

  const Schema= buyerSchema(checked)

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: buyerDetails,
  });


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateChecked(e.target.checked));
  };

  const onSubmit = (values: z.infer<typeof Schema>) => {
    dispatch(updateBuyerDetails(values));
    dispatch(updateStep(3));
  };

  return (
    <div className="px-3 md:px-7 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">
          <p className="text-base font-bold mb-2">Personal Details</p>
         <BuyerComponent form={form}/>
          <p className="text-base font-bold mb-2 mt-6">Shipping Address</p>
          <AddressForm form={form} isBillingAddress={false}/>
          <div
            className="flex items-center my-6 cursor-pointer lg:w-1/2"
            onClick={() => handleCheckboxChange({ target: { checked: !checked } })}
          >
            <div
              className={`w-5 h-5 border border-gray-400 flex items-center justify-center rounded-md ${
                checked ? "bg-blue-500" : ""
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
