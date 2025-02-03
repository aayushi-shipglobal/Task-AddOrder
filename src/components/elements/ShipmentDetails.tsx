import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";

export const ShipmentDetails = () => {
  return (
    <div>
      <div className="font-semibold text-lg mt-9 ml-6">Shipment Details</div>
      <p className="text-gray-400 text-sm font-semibold ml-6 mb-3">
        If you need more info, please check out <span className="text-blue-500 cursor-pointer">Help Page.</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-6">
        <div>
          <Label className="">
            Actual Weight<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-row border border-gray-300 rounded">
            <Input className="border-none" />

            <span className=" px-3 py-2 border-l border-gray-300  bg-gray-200 rounded-r">KG</span>
          </div>
        </div>
        <div>
          <Label className="mb-1">
            Length<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-row border border-gray-300 rounded">
            <Input className="border-none" />
            <span className=" px-3 py-2 border-l border-gray-300  bg-gray-200">CM</span>
          </div>
        </div>
        <div>
          <Label className="mb-1">
            Breadth<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-row border border-gray-300 rounded">
            <Input className="border-none" />
            <span className=" px-3 py-2 border-l border-gray-300  bg-gray-200">CM</span>
          </div>
        </div>

        <div>
          <Label className="mb-1">
            Height<span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-row border border-gray-300 rounded">
            <Input className="border-none" />
            <span className=" px-3 py-2 border-l border-gray-300  bg-gray-200">CM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
