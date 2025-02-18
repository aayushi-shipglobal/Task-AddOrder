import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateShippingPartner } from "./redux/addOrderSlice";
import { fetchShipperRates } from "./elements/ShipperApi";

function ShippingPartner() {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state: RootState) => state.addOrder.orderDetailsData);
  const ShippingPartner = useSelector((state: RootState) => state.addOrder.shippingPartner);
  const buyerDetails = useSelector((state: RootState) => state.addOrder.buyerDetailsData);
  const step = useSelector((state: RootState) => state.addOrder.step);

  const [courierOptions, setCourierOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const VolumetricWeight =
    (Number(orderDetails.length) * Number(orderDetails.breadth) * Number(orderDetails.height)) / 5000;

  useEffect(() => {
     
      const payload = {
        customer_shipping_country_code: buyerDetails.country,
        customer_shipping_postcode: buyerDetails.pincode,
        package_breadth: Number(orderDetails.breadth),
        package_height: orderDetails.height,
        package_length: Number(orderDetails.length),
        package_weight: Number(orderDetails.actualWeight),
      };
      fetchShipperRates(payload).then((rates) => {
        setCourierOptions(
          rates.map((rate: any) => ({
            name: rate.display_name,
            time: rate.transit_time,
            rate: rate.rate,
          })),
        );
      });
    
  }, [step, buyerDetails, orderDetails]);

  function onSubmit() {
    if (!ShippingPartner.name) return;
    dispatch(updateShippingPartner(ShippingPartner));
  }

  return (
    <div className="px-3 md:px-7 py-4">
      <p>
        All shipments via ShipGlobal services are <b>Delivered Duty Paid (DDP)</b>, hence <b>no extra duty</b> will be
        billed on the consignee or the shipper. Rates are inclusive of covid & fuel surcharge, exclusive of GST and
        ex-Delhi Hub.
      </p>
      <br />
      <p>
        In case of any doubt, please call/whatsapp at <span className="text-blue-800 font-semibold">011-422 77777</span>
      </p>
      <div className="flex flex-col md:flex-row items-center gap-2 justify-center px-10 md:px-32 mt-5">
        <div className={`border border-gray-300 text-center bg-gray-50 px-4 py-2 min-w-32 rounded-md`}>
          <p className="font-medium text-base">{Number(orderDetails.actualWeight).toFixed(2)} KG</p>
          <p className="text-xs">Dead weight</p>
        </div>
        <div className={`border border-gray-300 text-center bg-gray-50 px-4 py-2 md:min-w-36 min-w-32 rounded-md`}>
          <p className="font-medium text-base">{VolumetricWeight.toFixed(2)} KG</p>
          <p className="text-xs">Volumetric weight</p>
        </div>
        <div
          className={`border border-orange-300 bg-yellow-100 text-orange-500 text-center px-4 py-2 min-w-32 rounded-md`}
        >
          <p className="font-medium text-base">
            {Math.max(Number(orderDetails.actualWeight), VolumetricWeight).toFixed(2)} KG
          </p>
          <p className="text-xs">Billed weight</p>
        </div>
      </div>

      {loading && <p className="text-center mt-5">Loading courier options...</p>}

      {error && <p className="text-center text-red-500 mt-5">{error}</p>}

      {courierOptions.length > 1 && (
        <p className="mt-5 font-semibold">
          Showing {courierOptions.length} {courierOptions.length > 1 ? "results" : "result"}
        </p>
      )}

      {courierOptions.length !== 0 && (
        <table className="mt-5 w-full relative text-xs lg:text-sm border-separate border-spacing-y-2.5">
          <thead>
            <tr className="text-left text-slate-500 bg-slate-50">
              <th className="p-4 border-t border-b border-l rounded-l-md">Courier Partner</th>
              <th className="border-t border-b">Delivery Time</th>
              <th className="border-t border-b">Shipment Rate</th>
              <th className="border-t border-b border-r rounded-r-md pr-2">Select</th>
            </tr>
          </thead>
          <tbody>
            {courierOptions.map((courier, index) => (
              <tr
                key={index}
                className="cursor-pointer"
                onClick={() =>
                  dispatch(
                    updateShippingPartner({
                      name: courier.name,
                      rate: courier.rate,
                    }),
                  )
                }
              >
                <td className="font-medium pt-8 pb-4 pl-5 border-t border-b border-l rounded-l-md">{courier.name}</td>
                <td className="border-t border-b pt-4">{courier.time}</td>
                <td className="border-t border-b pt-4">{courier.rate}</td>
                <td className="border-t border-b pt-4 border-r rounded-r-md">
                  <CircleCheck
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      ShippingPartner?.name === courier.name ? "fill-green-500 text-white" : "text-white fill-gray-300"
                    }`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-end py-5">
        <button
          type="submit"
          onClick={onSubmit}
          className={`bg-blue-800 text-sm font-medium text-white rounded-md px-4 py-2 hover:bg-blue-800/90 ${
            !ShippingPartner.name ? "opacity-35 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={!ShippingPartner.name}
        >
          Pay and Order
        </button>
      </div>
    </div>
  );
}

export default ShippingPartner;
