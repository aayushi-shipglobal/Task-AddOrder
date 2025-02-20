import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { updateStep } from "@/components/redux/addOrderSlice";
import { Summary } from "@/components/informationSidebar/Summary";
import { QuickTips } from "@/components/informationSidebar/QuickTips";
import { BuyerDetails } from "@/components/addOrderForms/BuyerDetails";
import { OrderDetails } from "@/components/addOrderForms/OrderDetails";
import ShippingPartner from "@/components/addOrderForms/ShippingPartner";
import { AccordionComponent } from "@/components/elements/AccordionComponent";
import { ConsignorDetails } from "@/components/addOrderForms/ConsigorDetails";
import { ConsignorInformation } from "@/components/informationSidebar/ConsignorInformation";
import { ConsigneeInformation } from "@/components/informationSidebar/ConsigneeInformation";
import { ItemDetailsInformation } from "@/components/informationSidebar/ItemDetailsInformation";

export const AddOrderLayout = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state: RootState) => state.addOrder.step);

  const addOrderSteps = [
    {
      label: "Consignor Details",
      content: <ConsignorDetails />,
    },

    {
      label: "Consignee Details",
      content: <BuyerDetails />,
    },
    {
      label: "Shipment Information",
      content: <OrderDetails />,
    },
    { label: "Select Shipping Partner", content: <ShippingPartner /> },
  ];

  return (
    <div>
      <div className="bg-gray-50 min-h-screen px-2 pt-6 pb-20 lg:px-12">
        <p className="text-2xl mb-1 font-medium">Create CSB-IV Order</p>
        <BreadCrumb link="Orders" page="Create CSB-IV Order" />
        <div className="flex gap-3 mt-3">
          <div className="w-full -mt-3 rounded-md lg:w-2/3 flex flex-col">
            {addOrderSteps.map((item, index) => (
              <AccordionComponent
                key={index}
                text={item.label}
                activeStep={activeStep}
                isOpen={activeStep === index + 1}
                setActiveStep={(step: number) => dispatch(updateStep(step))}
                stepNumber={index + 1}
                content={item.content}
              />
            ))}
          </div>

          <div className="flex-col w-1/3 hidden lg:block">
            <div className="bg-white max-h-screen rounded-md px-8 py-3 overflow-y-scroll">
              {activeStep === 1 && <QuickTips />}
              {activeStep > 1 && <ConsignorInformation />}
              {activeStep > 2 && <ConsigneeInformation />}
              {activeStep > 3 && <ItemDetailsInformation />}
            </div>
            {activeStep == 4 && <Summary />}
          </div>
        </div>
      </div>
    </div>
  );
};
