import AccordionComponent from "@/components/elements/AccordionComponent";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { ConsignorDetails } from "@/components/AddOrderForms/ConsigorDetails";
import { BuyerDetails } from "@/components/AddOrderForms/BuyerDetails";
import { OrderDetails } from "@/components/AddOrderForms/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import ShippingPartner from "@/components/AddOrderForms/ShippingPartner";
import { QuickTips } from "@/components/elements/QuickTips";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { updateStep } from "@/components/redux/addOrderSlice";

export const AddOrderForm = () => {
  const PickupAddress = useSelector((state: RootState) => state.addOrder.pickupAddress);
  const buyerData = useSelector((state: RootState) => state.addOrder.buyerDetailsData);
  const shippingPartner = useSelector((state: RootState) => state.addOrder.shippingPartner);
  const activeStep = useSelector((state: RootState) => state.addOrder.step);
  const dispatch = useDispatch();

  const orderData = useSelector((state: RootState) => state.addOrder.orderDetailsData);
  const productValue = orderData.items?.[0]?.unitPrice * orderData.items?.[0]?.qty;
  const gst = 0.18 * shippingPartner.rate;
  const total = gst + shippingPartner.rate;
  const addOrderSteps = [
    {
      title: "Consignor Details",
      component: <ConsignorDetails />,
    },

    {
      title: "Consignee Details",
      component: <BuyerDetails />,
    },
    {
      title: "Shipment Information",
      component: <OrderDetails />,
    },
    { title: "Select Shipping Partner", component: <ShippingPartner /> },
  ];

  return (
    <div>
      <div className="bg-gray-50 min-h-screen px-2 pt-6 pb-20 lg:px-12">
        <p className="text-2xl mb-1 font-medium tracking-tight">Create CSB-IV Order</p>
        <BreadCrumb />
        <div className="flex gap-3 mt-3">
          <div className="w-full -mt-3 rounded-md lg:w-2/3 flex flex-col">
            {addOrderSteps.map((step, index) => (
              <AccordionComponent
                key={index}
                text={step.title}
                activeStep={activeStep}
                isOpen={activeStep === index + 1}
                setActiveStep={(step: number) => dispatch(updateStep(step))}
                stepNumber={index + 1}
                childElement={step.component}
              />
            ))}
          </div>

          <div className="flex-col w-1/3 hidden lg:block">
            <div className="bg-white max-h-screen rounded-md px-8 py-3 overflow-y-auto">
              {activeStep === 1 && <QuickTips />}
              {activeStep > 1 && (
                <Accordion type="single" collapsible>
                  <AccordionItem value="address">
                    <AccordionTrigger className="font-bold text-base">Consignor Details</AccordionTrigger>
                    <AccordionContent>
                      <div>
                        {" "}
                        <p className="text-gray-500">Address</p>
                        <p className="text-sm mt-3 font-normal">{PickupAddress}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              {activeStep > 2 && (
                <Accordion type="single" collapsible>
                  <AccordionItem value="address">
                    <AccordionTrigger className="font-bold text-base">Consignee Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-3">
                        <div className="mb-4">
                          {" "}
                          <p className="text-gray-500">Name</p>
                          <p className="text-sm font-normal">
                            {buyerData.firstName} {buyerData.lastName} | {buyerData.mobileNo}
                          </p>
                        </div>
                        <div className="mt-3">
                          {" "}
                          <p className="text-gray-500">Billing Address</p>
                          <p className="text-sm font-normal">Same as shipping Address</p>
                        </div>
                        <div className="mt-3">
                          <p className="text-gray-500">Shipping Address</p>
                          <p className="text-sm  font-normal">
                            {buyerData.address1}
                            {buyerData.address2}
                            {buyerData.city}
                            {buyerData.state}
                            {buyerData.country}
                            {buyerData.pincode}
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              {activeStep > 3 && (
                <div>
                  <p className="font-bold text-base">Item Details</p>
                  <div className="grid grid-cols-2 items-center text-sm">
                    <div>
                      <p className="text-gray-500">Shipping Address</p>
                      <p>{orderData.actualWeight} KG</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Dimentions</p>
                      <p>
                        {orderData.breadth} cm X {orderData.length} cm X {orderData.height} cm
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center text-sm mt-4">
                    <div>
                      <p className="text-gray-500">Product</p>
                      <p>{orderData.items?.[0]?.productName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">HSN</p>
                      <p>{orderData.items?.[0]?.hsn} </p>
                    </div>
                    <div>
                      <p className="text-gray-500">SKU</p>
                      <p>{orderData.items?.[0]?.sku} </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 items-center text-sm mt-4">
                    <div>
                      <p className="text-gray-500">Qty</p>
                      <p>{orderData.items?.[0]?.qty}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Unit Price</p>
                      <p>
                        {orderData.invoiceCurrency} {productValue.toFixed(2)}{" "}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total</p>
                      <p>
                        {orderData.invoiceCurrency} {productValue.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {activeStep == 4 && (
              <div className="bg-orange-50 mt-2 rounded-md pb-6">
                <p className="text-orange-500 my-4 pt-3 font-bold text-base pl-3">Summary</p>
                <hr />
                <div className="flex justify-between px-6 pt-3">
                  <p>Logistic Fee</p>
                  <p>Rs. {shippingPartner.rate}</p>
                </div>
                <div className="flex justify-between px-6 pb-3">
                  <p>GST</p>
                  <p>Rs. {gst}</p>
                </div>
                <div className="flex justify-between px-6 py-2 bg-orange-200">
                  {" "}
                  <div>Total</div>
                  <div>Rs. {total}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
