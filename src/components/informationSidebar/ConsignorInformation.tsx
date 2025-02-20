import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import React from "react";

export const ConsignorInformation = () => {
  const PickupAddress = useSelector((state: RootState) => state.addOrder.pickupAddress);
  const [openValue, setOpenValue] = React.useState<string | null>("address");

  return (
    <div>
      <Accordion type="single" collapsible value={openValue} onValueChange={setOpenValue}>
        <AccordionItem value="address">
          <AccordionTrigger className="font-semibold text-base">Consignor Details</AccordionTrigger>
          <AccordionContent>
            <div>
              <p className="text-gray-500">Address</p>
              <p className="text-sm mt-2 font-normal">{PickupAddress.toUpperCase()}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
