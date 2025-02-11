import { useState } from "react";
import { StepperSidebar } from "./elements/StepperSidebar";
import { Button } from "@/components/ui/button";

export const ShippingPartner = ({ nextStep, prevStep, setActiveStep, activeStep }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setSelectedItem(index === selectedItem ? null : index);
  };

  const Array = [
    { title: "ShipGlobal Fedex Advantage", days: "7 - 10", price: "2349" },
    { title: "ShipGlobal USPS Special", days: "7 - 10", price: "2467" },
    { title: "ShipGlobal Premium", days: "6 - 9", price: "2600" },
    { title: "ShipGlobal Express", days: "4 - 6", price: "2645" },
    { title: "ShipGlobal Premium UPS Ground", days: "7 - 10", price: "3080" },
  ];

  const Arrays = [
    {
      title: "ShipGlobal First Class",
      description: "Order cancellation not allowed after 10 days of booking!",
      days: "5 - 8",
      price: "3145",
    },
    {
      title: "ShipGlobal First Class (Signature POD)",
      description: "Order cancellation not allowed after 10 days of booking!",
      days: "5 - 8",
      price: "3607",
    },
    { title: "UPS Promotional", description: "Duties will be charged, if applicable", days: "4 - 7", price: "4625" },
    { title: "DHL Express", description: "Duties will be charged, if applicable", days: "4 - 7", price: "4958" },
    { title: "UPS", description: "Duties will be charged, if applicable", days: "4 - 7", price: "5183" },
    { title: "ShipGlobal WorldWide", description: "Documents are not allowed", days: "13 - 18", price: "5383" },
  ];
  return (
    <div className="lg:flex lg:flex-row lg:space-x-6 lg:justify-center py-12 lg:px-12 px-6">
      <StepperSidebar setActiveStep={setActiveStep} activeStep={activeStep} />
      <div className="bg-white rounded-md lg:w-2/3 px-4 md:px-8 pt-3">
        <div className="font-semibold text-lg mt-9 lg:ml-6 ml-2 mb-2">Select Shipping Partner</div>
        <p className="text-gray-400 text-sm font-semibold lg:ml-6 ml-2 mb-4">
          All shipments via ShipGlobal Direct service are Delivered Duty Paid (DDP), hence no extra duty will be billed
          on the consignee or the shipper. Rates are inclusive of covid & fuel surcharge, exclusive of GST and ex-Delhi
          Hub.
        </p>
        <p className="text-gray-400 lg:ml-7 ml-3 font-medium text-sm">
          If you need more info, please call/whatsapp at
          <span className="text-blue-500 cursor-pointer font-semibold"> 011-422 77 777.</span>
        </p>
        <div className="lg:flex space-y-3 lg:gap-x-4 items-center justify-center font-semibold mt-8">
          <div className="border border-dashed border-gray-200 rounded-md p-3">
            <p>2.00 KG</p>
            <p className="text-gray-400">Dead Weight</p>
          </div>
          <div className="border border-dashed border-gray-200 rounded-md p-3">
            <p>0.00 KG</p>
            <p className="text-gray-400">Volumetric Weight</p>
          </div>
          <div className="border border-dashed border-black rounded-md p-3">
            <p>2.00 KG</p>
            <p className="text-gray-400">Billed Weight</p>
          </div>
        </div>
        <div>
          {Array.map((item, index) => (
            <div
              key={index}
              className={`border border-dashed rounded-md mt-8 lg:p-4 p-2 ${
                selectedItem === index ? "bg-blue-100 border-blue-500" : "border-gray-300"
              }`}
              onClick={() => handleItemClick(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center md:space-x-4  space-x-2">
                  <div
                    className={`rounded-full p-1.5 md:p-2 border border-gray-500 cursor-pointer ${
                      selectedItem === index ? "bg-blue-500 " : "border-gray-300 bg-gray-200"
                    }`}
                    onClick={() => handleItemClick(index)}
                  />
                  <div><p className=" text-sm md:text-lg font-medium md:font-semibold">{item.title}</p>
                  <p className="text-xs md:text-sm text-gray-400 font-medium  ">Estimated Transit: {item.days} Days</p></div>
                  
                </div>

                <p className="text-base md:text-2xl font-bold  text-center">
                  <span className="text-xs md:text-sm font-medium">Rs. </span>
                  {item.price}
                </p>
              </div>
              
            </div>
          ))}
        </div>
        <div>
          {Arrays.map((item, index) => (
            <div
              className={`flex justify-between border border-dashed border-gray-300 rounded-md mt-8 lg:p-4 p-1 ${
                selectedItem === index ? "bg-blue-100 border-blue-500" : "border-gray-300"
              }`}
              onClick={() => handleItemClick(index)}
              key={index}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`rounded-full p-1.5 md:p-2 border border-gray-500  cursor-pointer ${
                    selectedItem === index ? "bg-blue-500 " : "border-gray-300 bg-gray-200"
                  }`}
                  onClick={() => handleItemClick(index)}
                />
                <div>
                  <p className=" text-sm md:text-lg font-medium md:font-semibold">{item.title}</p>
                  <p className="text-xs md:text-sm text-red-500 font-semibold ">{item.description}</p>
                  <p className="text-xs md:text-sm text-gray-400 font-medium lg:ml-2">Estimated Transit: {item.days} Days</p>
                </div>
              </div>
              <p className="text-base md:text-2xl font-bold mt-4">
                <p className="lg:text-2xl lg:font-bold lg:mt-4 text-center">
                  <span className="text-xs md:text-sm font-medium">Rs. </span>
                  {item.price}
                </p>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <Button
            type="submit"
            className="px-4 py-2 mb-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 mb-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={nextStep}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
