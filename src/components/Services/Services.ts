import { token } from "./token";

export const fetchCountry = async () => {
  try {
    const response = await fetch("https://api.fr.stg.shipglobal.in/api/v1/location/countries");
    const result = await response.json();
    if (result.data && result.data.countries) {
      const formattedCountries = result.data.countries.map((country: any) => ({
        value: country.country_iso2,
        label: country.country_display,
      }));
      return formattedCountries;
    } else {
      throw new Error("Countries data is empty or invalid.");
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};
export const fetchStatesByCountry = async (countrySelected: string) => {
  try {
    const response = await fetch(`https://api.fr.stg.shipglobal.in/api/v1/location/states`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state_country_code: countrySelected,
      }),
    });

    const result = await response.json();
    if (result.data && result.data.states) {
      return result.data.states.map((state: any) => ({
        value: state.state_name,
        label: state.state_name,
      }));
    } else {
      throw new Error("States data not found");
    }
  } catch (error) {
    console.error("Error fetching states:", error);
    throw error;
  }
};

export const fetchShippers = async (payload: any) => {
  try {
    const response = await fetch(`https://api.fr.stg.shipglobal.in/api/v1/orders/get-shipper-rates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result?.data?.rate || [];
  } catch (error) {
    console.error("Error fetching shipper rates:", error);
    return [];
  }
};

export const validateOrderInvoice = async (orderDetails: any, itemDetails: any) => {
  const payload = {
    csbv: "0",
    currency_code: orderDetails.invoiceCurrency,
    package_breadth: Number(orderDetails.breadth),
    package_height: Number(orderDetails.height),
    package_length: Number(orderDetails.length),
    package_weight: Number(orderDetails.actualWeight),
    vendor_order_item: itemDetails.map((item: any) => ({
      vendor_order_item_name: item.productName,
      vendor_order_item_sku: item.sku,
      vendor_order_item_hsn: item.hsn,
      vendor_order_item_quantity: Number(item.qty),
      vendor_order_item_unit_price: Number(item.unitPrice),
      vendor_order_item_tax_rate: item.igst,
    })),
  };

  try {
    const response = await fetch(`https://api.fr.stg.shipglobal.in/api/v1/orders/validate-order-invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching order validation:", error);
    throw new Error("There was an error while validating the order.");
  }
};
