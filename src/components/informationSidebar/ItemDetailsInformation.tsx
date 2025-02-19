import { RootState } from "@/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export const ItemDetailsInformation = () => {
  const orderData = useSelector((state: RootState) => state.addOrder.orderDetailsData);
  const [visibleItems, setVisibleItems] = useState(false);

  const toggleVisibility = () => {
    setVisibleItems(!visibleItems);
  };
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

      {orderData.items?.map((item, index) => {
        const productValue = Number(item.qty) * Number(item.unitPrice);
        const isVisible = visibleItems;

        return (
          (index == 0 || (index >= 1 && isVisible)) && (
            <div key={index}>
              <div className="grid grid-cols-3 items-center text-sm mt-4 gap-4">
                <div>
                  <p className="text-gray-500">Product</p>
                  <p>{item.productName}</p>
                </div>
                <div>
                  <p className="text-gray-500">HSN</p>
                  <p>{item.hsn}</p>
                </div>
                <div>
                  <p className="text-gray-500">SKU</p>
                  <p>{item.sku}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center text-sm mt-4">
                <div>
                  <p className="text-gray-500">Qty</p>
                  <p>{item.qty}</p>
                </div>
                <div>
                  <p className="text-gray-500">Unit Price</p>
                  <p>
                    {orderData.invoiceCurrency} {Number(item.unitPrice).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p>
                    {orderData.invoiceCurrency} {productValue.toFixed(2)}
                  </p>
                </div>
              </div>

              {orderData.items.length > 1 && (
                <div className="flex gap-44 items-center mt-2">
                  {!isVisible && (
                    <div className="text-orange-500 text-xs">+{orderData.items.length - 1} more products...</div>
                  )}
                  <div className="flex justify-end">
                    <button onClick={() => toggleVisibility()} className="text-indigo-800 hover:underline text-xs ">
                      {isVisible ? "" : "View"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        );
      })}
      <div className="flex justify-end">
        <button onClick={() => toggleVisibility()} className="text-indigo-800 hover:underline text-xs ">
          {visibleItems ? "Hide" : ""}
        </button>
      </div>
    </div>
  );
};
