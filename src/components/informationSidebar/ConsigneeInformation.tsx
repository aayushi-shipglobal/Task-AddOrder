import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export const ConsigneeInformation = () => {
    const buyerData = useSelector((state: RootState) => state.addOrder.buyerDetailsData);
    const checked = useSelector((state: RootState) => state.addOrder.buyerDetailsData.checked);

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="address">
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
                  <p className="text-sm font-normal mt-1">
                    {buyerData.address3}
                    {buyerData.address4}
                    {buyerData.city1}
                    {buyerData.state1}
                    {buyerData.Country}
                    {buyerData.pincode1}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <p className="text-gray-500 mb-1">Shipping Address</p>
                <p className="text-sm  font-normal">
                  {buyerData.address1}
                  {buyerData.address2}
                  {buyerData.city}
                  {buyerData.state}
                  {buyerData.country}
                  {buyerData.pincode}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
