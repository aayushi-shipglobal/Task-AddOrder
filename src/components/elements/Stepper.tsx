import { useState } from "react";
import { BuyerDetails } from "../BuyerDetails";
import { OrderDetails } from "../OrderDetails";
import { ShippingPartner } from "../ShippingPartner";
import { PlaceOrder } from "../PlaceOrder";

export const Stepper = () => {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <div>
      {activeStep == 1 && <BuyerDetails activeStep={activeStep} setActiveStep={setActiveStep} />}
      {activeStep == 2 && <OrderDetails activeStep={activeStep} setActiveStep={setActiveStep} />}
      {activeStep == 3 && <ShippingPartner activeStep={activeStep} setActiveStep={setActiveStep} />}
      {activeStep == 4 && <PlaceOrder activeStep={activeStep} setActiveStep={setActiveStep} />}
    </div>
  );
};
