import { StepperSidebar } from "./elements/StepperSidebar";
import { Button } from "@/components/ui/button";

export const PlaceOrder = ({ prevStep, buyerDetails, orderDetails }) => {
  console.log(buyerDetails);
  return (
    <div className="flex lg:flex-row space-x-6 justify-center py-12 px-28">
      <StepperSidebar />
      <div className="bg-white rounded-md w-2/3 px-8">
        <div className="font-semibold text-lg mt-9 ml-0 mb-8">Order Details</div>
        <div className="grid grid-cols-2">
          <div>
            <p className="text-gray-500 font-medium">Pickup Address:</p>
            <p>Head Office</p>
            <div className="text-sm text-gray-500 font-medium">
              {" "}
              <p>Head Office</p>
              <p>mahipalpur</p>
              <p>Indira Park, South West Delhi</p>
              <p>Delhi-110045</p>
              <p>India</p>
              <p>8392328932</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Delivery Address:</p>
            <p>{buyerDetails?.firstName || 'N/A'}</p> 
            <p></p>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-8">
          <div>
            <p className="text-gray-500 font-semibold">Shipping Partner:</p>
            <p className="text-sm font-semibold">ShipGlobal Fedex Advantage</p>
            <p className="text-gray-500 text-sm">Transit Time: 7 - 10 Days</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Shipment Mode</p>
            <p>CSB-IV</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Billed Weight:</p>
            <p>2.00 KG</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <Button
            type="submit"
            className="px-4 py-2 mb-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button type="submit" className="px-4 py-2 mb-6 bg-green-400 text-white rounded-md hover:bg-green-500">
            Pay & Add Order
          </Button>
        </div>
      </div>
    </div>
  );
};
