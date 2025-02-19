import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const ItemDetailsInformation = () => {
  const orderData = useSelector((state: RootState) => state.addOrder.orderDetailsData);
  const productValue = Number(orderData.items?.[0]?.unitPrice) * Number(orderData.items?.[0]?.qty);
  return (
    <div className="border-t">
      <p className="font-semibold text-base mt-8">Item Details</p>
      <div className="grid grid-cols-2 items-center text-sm mt-3">
        <div>
          <p className="text-gray-500">Billed Weight</p>
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
            {orderData.invoiceCurrency} {productValue.toFixed(2)}
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
  );
};
