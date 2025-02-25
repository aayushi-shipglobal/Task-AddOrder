import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const Summary = () => {
  const shippingPartner = useSelector((state: RootState) => state.addOrder.shippingPartner);
  const rates =  Number(shippingPartner.rate);
  const gst = rates * 0.18;
  const total = gst + rates;

  return (
    <div className="bg-orange-50 mt-2 rounded-md pb-6 border border-gray-200 text-sm">
      <p className="text-orange-300 my-4 pt-3 font-bold text-base pl-3">Summary</p>
      <hr />
      <div className="flex justify-between px-6 py-3">
        <p>Logistic Fee</p>
        <p>Rs. {shippingPartner.rate}</p>
      </div>
      <div className="flex justify-between px-6 pb-3">
        <p>GST</p>
        <p>Rs. {gst.toFixed(2)}</p>
      </div>
      <div className="flex justify-between px-6 py-2 bg-orange-200 font-medium">
        {" "}
        <div>Total</div>
        <div>Rs. {total.toFixed(2)}</div>
      </div>
    </div>
  );
};
