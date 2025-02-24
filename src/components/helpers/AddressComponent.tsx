import { RootState } from "@/store";
import { useSelector } from "react-redux";

const formatAddress = (addressFields: string[]): string => {
  return addressFields.filter(Boolean).join(" ");
};

export const AddressComponent = () => {
  const buyerData = useSelector((state: RootState) => state.addOrder.buyerDetailsData);

  const shippingAddressFields = [
    buyerData.address1,
    buyerData.address2,
    buyerData.city,
    buyerData.state,
    localStorage.getItem("value"),
    buyerData.pincode,
  ];

  const billingAddressFields = [
    buyerData.address3,
    buyerData.address4,
    buyerData.city1,
    buyerData.state1,
    localStorage.getItem("item"),
    buyerData.pincode1,
  ];

  const formattedShippingAddress = formatAddress(shippingAddressFields);
  const formattedBillingAddress = formatAddress(billingAddressFields);

  return { formattedShippingAddress, formattedBillingAddress };
};
