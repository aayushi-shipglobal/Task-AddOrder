import { useEffect, useState } from "react";
import { CircleCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateShippingPartner } from "@/components/redux/addOrderSlice";
import { fetchshippers } from "@/components/Services/ShipperApi";

function ShippingPartner() {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state: RootState) => state.addOrder.orderDetailsData);
  const selectedShippingProvider = useSelector((state: RootState) => state.addOrder.shippingPartner);
  const buyerInformation = useSelector((state: RootState) => state.addOrder.buyerDetailsData);
  const currentStep = useSelector((state: RootState) => state.addOrder.step);

  const [availableShippingOptions, setAvailableShippingOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const volumetricWeight =
    (Number(orderDetails.length) * Number(orderDetails.breadth) * Number(orderDetails.height)) / 5000;

  useEffect(() => {
    const requestPayload = {
      customer_shipping_country_code: buyerInformation.country,
      customer_shipping_postcode: buyerInformation.pincode,
      package_breadth: Number(orderDetails.breadth),
      package_height: orderDetails.height,
      package_length: Number(orderDetails.length),
      package_weight: Number(orderDetails.actualWeight),
    };

    const fetchRates = async () => {
      setIsLoading(true);
      try {
        const rates = await fetchshippers(requestPayload);
        setAvailableShippingOptions(
          rates.map((rate: any) => ({
            name: rate.display_name,
            deliveryTime: rate.transit_time,
            price: rate.rate,
          })),
        );
      } catch (err) {
        console.error("Error fetching shipping options:", err);
        setApiError("Failed to fetch shipping options. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [currentStep, buyerInformation, orderDetails]);

  const handleShippingProviderSelection = (provider: any) => {
    dispatch(updateShippingPartner(provider));
  };

  const handleSubmit = () => {
    if (!selectedShippingProvider) return;
    dispatch(updateShippingPartner(selectedShippingProvider));
  };

  return (
    <div className="px-3 md:px-7 py-4">
      <p>
        All shipments via ShipGlobal services are <strong>Delivered Duty Paid (DDP)</strong>, hence{" "}
        <strong>no extra duty</strong> will be billed on the consignee or the shipper. Rates are inclusive of covid &
        fuel surcharge, exclusive of GST and ex-Delhi Hub.
      </p>

      <p>
        In case of any doubt, please call/whatsapp at <span className="text-blue-800 font-semibold">011-422 77777</span>
      </p>

      <div className="flex flex-col md:flex-row items-center gap-2 justify-center px-10 md:px-32 mt-5">
        <WeightCard label="Dead weight" value={Number(orderDetails.actualWeight)} />
        <WeightCard label="Volumetric weight" value={volumetricWeight} />
        <WeightCard
          label="Billed weight"
          value={Math.max(Number(orderDetails.actualWeight), volumetricWeight)}
          highlight
        />
      </div>

      {isLoading && <p className="text-center mt-5">Loading available shipping options...</p>}
      {apiError && <p className="text-center text-red-500 mt-5">{apiError}</p>}

      {availableShippingOptions.length > 0 && (
        <>
          <p className="mt-5 font-semibold">
            Showing {availableShippingOptions.length} {availableShippingOptions.length > 1 ? "results" : "result"}
          </p>
          <ShippingOptionsTable
            options={availableShippingOptions}
            onSelect={handleShippingProviderSelection}
            selectedProvider={selectedShippingProvider}
          />
        </>
      )}

      <div className="flex justify-end py-5">
        <button
          type="submit"
          onClick={handleSubmit}
          className={`bg-blue-800 text-sm font-medium text-white rounded-md px-4 py-2 hover:bg-blue-800/90 ${
            !selectedShippingProvider ? "opacity-35 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={!selectedShippingProvider}
        >
          Pay and Order
        </button>
      </div>
    </div>
  );
}

const WeightCard = ({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) => (
  <div
    className={`border ${
      highlight ? "border-orange-300 bg-yellow-100 text-orange-500" : "border-gray-300"
    } text-center px-4 py-2 min-w-32 rounded-md`}
  >
    <p className="font-medium text-base">{value.toFixed(2)} KG</p>
    <p className="text-xs">{label}</p>
  </div>
);

const ShippingOptionsTable = ({
  options,
  onSelect,
  selectedProvider,
}: {
  options: any[];
  onSelect: (provider: any) => void;
  selectedProvider: any;
}) => (
  <table className="mt-5 w-full relative text-xs lg:text-sm border-separate border-spacing-y-2.5">
    <thead>
      <tr className="text-left text-slate-500 bg-slate-50">
        <th className="p-4 border-t border-b border-l rounded-l-md">Shipping Provider</th>
        <th className="border-t border-b">Delivery Time</th>
        <th className="border-t border-b">Shipment Price</th>
        <th className="border-t border-b border-r rounded-r-md pr-2">Select</th>
      </tr>
    </thead>
    <tbody>
      {options.map((provider, index) => (
        <tr key={index} className="cursor-pointer" onClick={() => onSelect(provider)}>
          <td className="font-medium pt-8 pb-4 pl-5 border-t border-b border-l rounded-l-md">{provider.name}</td>
          <td className="border-t border-b pt-4">{provider.deliveryTime}</td>
          <td className="border-t border-b pt-4">{provider.price}</td>
          <td className="border-t border-b pt-4 border-r rounded-r-md">
            <CircleCheck
              className={`h-6 w-6 cursor-pointer transition-colors ${
                selectedProvider?.name === provider.name ? "fill-green-500 text-white" : "text-white fill-gray-300"
              }`}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ShippingPartner;
