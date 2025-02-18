
const url = "https://api.fr.stg.shipglobal.in/api/v1/orders/validate-order-invoice";

const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzAwNjcsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMTEgMTc6MTY6MTAuNTk0ODQ3IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0xMyAxNzoxNjoxMC41OTQ4NDkiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6IjU0YTVhMDZmLTlmMTItNDNkMS05NjRmLWY0NmU0NDAzZmJlYiIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.Mgqd-wgxjBYG2o9rztEvgrEzuEXxUYjoKXcmmDCg1jw";

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
    const response = await fetch(url, {
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
