import { BuyerDetails } from "./components/BuyerDetails";

import { OrderDetails } from "./components/OrderDetails";
import { PlaceOrder } from "./components/PlaceOrder";
import { ShippingPartner } from "./components/ShippingPartner";

function App() {
  return (
    <div className="bg-gray-200">
      <BuyerDetails />
      <OrderDetails/>
      <ShippingPartner/>
      <PlaceOrder/>
    </div>
  );
}

export default App;
