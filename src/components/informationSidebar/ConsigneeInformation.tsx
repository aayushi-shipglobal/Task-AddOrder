import React from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { AddressComponent } from "@/components/helpers/AddressComponent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const ConsigneeInformation = () => {
  const { formattedShippingAddress, formattedBillingAddress } = AddressComponent();
  const buyerData = useSelector((state: RootState) => state.addOrder.buyerDetailsData);
  const checked = useSelector((state: RootState) => state.addOrder.buyerDetailsData.checked);
  const [openValue, setOpenValue] = React.useState<string | null>("name");


  return (
    <div>
      <Accordion type="single" collapsible value={openValue} onValueChange={setOpenValue}>
        <AccordionItem value="name">
          <AccordionTrigger className="font-semibold text-base border-t ">Consignee Details</AccordionTrigger>
          <AccordionContent>
            <div className="mt-3">
              <div className="mb-4">
                {" "}
                <p className="text-gray-500">Name</p>
                <p className="text-sm font-medium">
                  {buyerData.firstName} {buyerData.lastName} | {buyerData.mobileNo}
                </p>
              </div>
              <div className="mt-3">
                {" "}
                <p className="text-gray-500">Billing Address</p>
                {checked ? (
                  <p className="text-sm font-normal">Same as shipping Address</p>
                ) : (
                  <p className="text-sm font-normal mt-1">{formattedBillingAddress}</p>
                )}
              </div>
              <div className="mt-3">
                <p className="text-gray-500 mb-1">Shipping Address</p>
                <p className="text-sm  font-normal">{formattedShippingAddress}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
