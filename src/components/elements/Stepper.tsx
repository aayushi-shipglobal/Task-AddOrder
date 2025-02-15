import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateStep } from "../../reducer/orderSlice"; 
import { RootState } from "../../store"; 
import { BuyerDetails } from "../BuyerDetails";
import { OrderDetails } from "../OrderDetails";
import { ShippingPartner } from "../ShippingPartner";
import { PlaceOrder } from "../PlaceOrder";

export const Stepper = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.order.step);

  const nextStep = () => {
    if (currentStep < 4) {
      dispatch(updateStep(currentStep + 1)); 
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      dispatch(updateStep(currentStep - 1)); 
    }
  };

  useEffect(() => {
    dispatch(updateStep(currentStep));
  }, [currentStep, dispatch]);

  return (
    <div>
      {currentStep === 1 && (
        <BuyerDetails
          nextStep={nextStep}
          
        />
      )}
      {currentStep === 2 && (
        <OrderDetails
          nextStep={nextStep}
          prevStep={prevStep}
         
        />
      )}
      {currentStep === 3 && (
        <ShippingPartner
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {currentStep === 4 && (
        <PlaceOrder
          prevStep={prevStep}
          
        />
      )}
    </div>
  );
};