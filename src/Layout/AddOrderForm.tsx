import { useState } from "react";
import AccordionComponent from "@/components/elements/AccordionComponent";
import BreadCrumb from "../components/elements/BreadCrumb";
import { ConsignorDetails } from "../components/ConsigorDetails";
import { BuyerDetails } from "@/components/BuyerDetails";
import { OrderDetails } from "@/components/OrderDetails";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ShippingPartner from "@/components/ShippingPartner";
import { QuickTips } from "@/components/elements/QuickTips";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

export const AddOrderForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const PickupAddress = useSelector((state: RootState) => state.addOrder.pickupAddress);

  const formSteps = [
    {
      title: "Consignor Details",
      component: <ConsignorDetails setActiveStep={setActiveStep} />,
    },

    {
      title: "Consignee Details",
      component: <BuyerDetails setActiveStep={setActiveStep} />,
    },
    {
      title: "Shipment Information",
      component: <OrderDetails setActiveStep={setActiveStep} />,
    },
    { title: "Select Shipping Partner", component: <ShippingPartner /> },
  ];

  return (
    <div>
      <div className="bg-gray-50 min-h-screen px-2 pt-6 pb-20 lg:px-12">
        <p className="text-2xl mb-1 font-medium tracking-tight">Create CSB-IV Order</p>
        <BreadCrumb />
        <div className="flex gap-3 mt-3">
          <div className="w-full -mt-3 rounded-md lg:w-2/3 flex flex-col">
            {formSteps.map((step, index) => (
              <AccordionComponent
                key={index}
                text={step.title}
                activeStep={activeStep}
                isOpen={activeStep === index + 1}
                setActiveStep={setActiveStep}
                stepNumber={index + 1}
                childElement={step.component}
              />
            ))}
          </div>

          <div className="flex-col w-1/3 hidden lg:block">
            <div className="bg-white max-h-screen rounded-md px-8 py-3 overflow-y-auto">
              {activeStep === 1 && <QuickTips />}
              {activeStep > 1 && (
                <Accordion type="single" collapsible>
                  <AccordionItem value="address">
                    <AccordionTrigger className="font-bold text-base">Consignor Details</AccordionTrigger>
                    <AccordionContent>
                      <div>
                        {" "}
                        <p className="text-gray-500">Address</p>
                        <p className="text-sm mt-3 font-normal">{PickupAddress}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              {activeStep > 2 && <Accordion type="single" collapsible></Accordion>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
