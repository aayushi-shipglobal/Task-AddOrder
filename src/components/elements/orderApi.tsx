import { z } from "zod";

export const orderApi = async (orderData: z.infer<typeof formSchema>) => {
  try {
    const totalValue = orderData.items.reduce((acc, item) => {
      const qty = parseFloat(item.qty);
      const unitPrice = parseFloat(item.unitPrice);
      return acc + qty * unitPrice;
    }, 0);

    if (totalValue > 25000) {
      throw new Error("The total value of items exceeds the allowed limit of 25,000.");
    }

    const response = await fetch("https://api.fr.stg.shipglobal.in/api/v1/orders/validate-order-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "An error occurred while validating the order.");
    }

    return data; 

  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};
