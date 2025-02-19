import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select } from "../elements/Select";
import { updatePickupAddress, updateStep } from "../redux/addOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/store";
import { consignorSchema } from "../schemas/ValidationSchemas";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";

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
            <div className="max-w-max overflow-hidden mt-3">
              <Select form={consignorForm} name="pickupAddress" />
            </div>
          </div>
          {consignorData && (
            <div className="ml-2 text-sm">
              <p>{consignorData}</p>
            </div>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-800 rounded-md text-sm px-4 py-2 font-medium text-white hover:bg-blue-800/95"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
