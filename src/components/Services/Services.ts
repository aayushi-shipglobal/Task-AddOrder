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

export const validateOrderInvoice = async (payload:any) => {
  

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
   
  }
};
