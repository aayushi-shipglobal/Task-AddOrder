import { z } from "zod";
import { useEffect } from "react";
import { RootState } from "@/store";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { Select } from "@/components/elements/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { ButtonComp } from "@/components/elements/ButtonComp";
import { consignorSchema } from "@/components/schemas/ValidationSchemas";
import { updatePickupAddress, updateStep } from "@/components/redux/addOrderSlice";

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
    <div className="px-3 md:px-8 py-4">
      <Form {...consignorForm}>
        <form onSubmit={consignorForm.handleSubmit(onSubmit)} className="mt-2 space-y-3">
          <div>
            <Label className="font-normal">Search Customer</Label>
            <div className="w-auto mr-36 overflow-hidden text-ellipsis mt-3">
              <Select form={consignorForm} name="pickupAddress" />
            </div>
          </div>
          {consignorData && (
            <div className="ml-2 text-sm">
              <p>{consignorData}</p>
            </div>
          )}
          <ButtonComp />
        </form>
      </Form>
    </div>
  );
};
