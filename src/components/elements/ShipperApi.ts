const url = "https://api.fr.stg.shipglobal.in/api/v1/orders/get-shipper-rates";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMTEgMTY6NDA6MjYuOTY0NDc1IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMyAxNjo0MDoyNi45NjQ0NzciLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6IjYwNmY4Mzc0LTg3YWItNGRhMy1iNGJiLTUyNTY1Y2YyMWU3MiIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.KExiOvks3yg4fvKXq6I-TlBbIE45eRdLo8mFC4tccMg";

export const fetchShipperRates = async (payload:any) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data)
      return data?.data?.rate || [];
    } catch (error) {
      console.error("Error fetching shipper rates:", error);
      return [];
    }
}
