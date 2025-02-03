import { ItemDetails } from "./elements/ItemDetails";
import { OrderDetailsComp } from "./elements/OrderDetailsComp";
import { ShipmentDetails } from "./elements/ShipmentDetails";
import { StepperSidebar } from "./elements/StepperSidebar";
// import { Card } from "./ui/card";

export const OrderDetails = () => {
  return (
    <div className="flex lg:flex-row space-x-6 justify-center py-12 px-28">
      <StepperSidebar />

      <div className="bg-white rounded-md w-2/3 px-8">
        <div className="font-semibold text-lg mt-9 ml-6 mb-2">Shipment Type</div>
        <p className="text-gray-400 text-sm font-semibold ml-6 mb-4">
          Please select the shipment Mode. Note: CSB-V Shipments can only be sent through ShipGlobal Direct. If other
          partner services are needed please select CSB IV.
        </p>
        <p className="text-gray-500 ml-6 font-medium">
          If you need more info, please call/whatsapp at
          <span className="text-blue-500 cursor-pointer">+91 9811098919.</span>
        </p>
        {/* <div className="grid grid-cols-2">
            <Card title="CSB IV" description="Non Commercial Mode Minimum Documentation All Service Providers"/>
            <Card title="CSB V" description="Commercial Mode "/>
          </div> */}

        <div>
          <ShipmentDetails />
        </div>
        <div><OrderDetailsComp/></div>
        <div>
          <ItemDetails/>
        </div>
      </div>
    </div>
  );
};
