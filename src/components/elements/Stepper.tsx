import { useState, useEffect } from "react";
import { BuyerDetails } from "../BuyerDetails";
import { OrderDetails } from "../OrderDetails";
import { ShippingPartner } from "../ShippingPartner";
import { PlaceOrder } from "../PlaceOrder";

export const Stepper = () => {
  const [activeStep, setActiveStep] = useState(() => {
    const savedActiveStep = localStorage.getItem("activeStep");
    return savedActiveStep ? Number(savedActiveStep) : 1; 
  });

  const [buyerDetails, setBuyerDetails] = useState(() => {
    const savedBuyerDetails = localStorage.getItem("buyerDetails");
    return savedBuyerDetails ? JSON.parse(savedBuyerDetails) : {}; 
  });

  const [orderDetails, setOrderDetails] = useState(() => {
    const savedOrderDetails = localStorage.getItem("orderDetails");
    return savedOrderDetails ? JSON.parse(savedOrderDetails) : {}; 
  });

  useEffect(() => {
    localStorage.setItem("activeStep", String(activeStep));
   
  }, [activeStep]);

  const nextStep = (data: {}) => {
    setBuyerDetails((prevDetails:any) => ({
      ...prevDetails,
      ...data,
    }));

    setOrderDetails(data);
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      {activeStep === 1 && (
        <BuyerDetails
          nextStep={nextStep}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          buyerDetails={buyerDetails}
        />
      )}
      {activeStep === 2 && (
        <OrderDetails
          nextStep={nextStep}
          prevStep={prevStep}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          orderDetails={orderDetails}
        />
      )}
      {activeStep === 3 && (
        <ShippingPartner
          nextStep={nextStep}
          prevStep={prevStep}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
      {activeStep === 4 && (
        <PlaceOrder
          prevStep={prevStep}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          buyerDetails={buyerDetails}
        />
      )}
    </div>
  );
};
