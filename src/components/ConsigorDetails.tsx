import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select } from "./elements/Select";
import { updatePickupAddress, updateStep } from "./redux/addOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/store";
import { consignorSchema } from "./schemas/ValidationSchemas";

export const ConsignorDetails = () => {
  const dispatch = useDispatch();
  const PickupAddress = useSelector((state: RootState) => state.addOrder.pickupAddress);

  const consignorForm = useForm<z.infer<typeof consignorSchema>>({
    resolver: zodResolver(consignorSchema),
    defaultValues: {
      pickupAddress: PickupAddress || "",
    },
  });
  useEffect(() => {
    consignorForm.setValue("pickupAddress", PickupAddress);
  }, [PickupAddress, consignorForm]);

  const consignorData = consignorForm.watch("pickupAddress");

  function onSubmit(values: z.infer<typeof consignorSchema>) {
    dispatch(updatePickupAddress(values.pickupAddress));
    dispatch(updateStep(2));
  }
  return (
    <div className="px-3 md:px-7 py-4">
      <Form {...consignorForm}>
        <form onSubmit={consignorForm.handleSubmit(onSubmit)} className="mt-2 space-y-3">
          <div className="space-y-1">
            <label className="font-medium">Select Pickup address</label>
            <div className="w-5/6">
              {" "}
              <Select form={consignorForm} name="pickupAddress" />
            </div>
          </div>
          {consignorData && (
            <div className="space-y-1 w-5/6">
              <p>{consignorData}</p>
            </div>
          )}

          <div className="flex justify-end">
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
