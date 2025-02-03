import { StepperSidebar } from "./elements/StepperSidebar";

export const PlaceOrder = () => {
  return (
    <div className="flex lg:flex-row space-x-6 justify-center py-12 px-28">
      <StepperSidebar />
      <div className="bg-white rounded-md w-2/3 px-8">
        <div className="font-semibold text-lg mt-9 ml-0 mb-8">Order Details</div>
        <div className="grid grid-cols-2">
          <div>
            <p className="text-gray-500 font-medium">Pickup Address:</p>
            <p>Head Office</p>
            <p>Head Office</p>
            <p>mahipalpur</p>
            <p>Indira Park, South West Delhi</p>
            <p>Delhi-110045</p>
            <p>India</p>
            <p>8392328932</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Delivery Address:</p>
          </div>
        </div>
      </div>
    </div>
  );
};
