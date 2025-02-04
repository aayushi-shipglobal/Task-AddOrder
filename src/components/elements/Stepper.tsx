import { useState } from "react";
import { BuyerDetails } from "../BuyerDetails";
import { OrderDetails } from "../OrderDetails";
import { ShippingPartner } from "../ShippingPartner";
// import { PlaceOrder } from "../PlaceOrder";

export const Stepper = () => {
  const [activeStep, setActiveStep] = useState(1);
  // const[buyerDetails,setBuyerDetails]=useState(null);
  // const[orderDetails,setOrderDetails]=useState({});

  const nextStep = () => {
    // setBuyerDetails(data);
    // setOrderDetails(data);
    setActiveStep(activeStep + 1);
  };
  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <div>
      {activeStep == 1 && <BuyerDetails nextStep={nextStep} />}
      {activeStep == 2 && <OrderDetails nextStep={nextStep} prevStep={prevStep} />}
      {activeStep == 3 && <ShippingPartner nextStep={nextStep} prevStep={prevStep} />}
      {/* {activeStep == 4 && <PlaceOrder prevStep={prevStep} buyerDetails={buyerDetails} orderDetails={orderDetails}/>} */}
    </div>
  );
};
