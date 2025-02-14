import { createSlice } from "@reduxjs/toolkit";

// Initial state with shipping and billing within the same object
const initialState = {
  buyerDetails: {
    firstName: "",
    lastName: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    shippingAddress: {
      country: "",
      address1: "",
      address2: "",
      pincode: "",
      city: "",
      state: "",
    },
    billingAddress: {
      country: "",
      address1: "",
      address2: "",
      pincode: "",
      city: "",
      state: "",
    },
    isBillingSame: true, // If true, billingAddress = shippingAddress
  },

  orderDetails: {
    id: "",
    csbNumber: "IV", // Default value
    actualWeight: "",
    length: "",
    breadth: "",
    height: "",
    invoiceNo: "",
    invoiceDate: "",
    invoiceCurrency: "",
    orderId: "",
    iossNumber: "",
    items: [
      {
        productName: "",
        sku: "",
        hsn: "",
        qty: "",
        unitPrice: "",
        igst: "",
      },
    ],
  },

  step: 1,
  shippingPartner: "Shipglobal WorldWide",
  csbNumber: "IV",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Update buyerDetails (Shipping & Billing)
    updateBuyerDetails: (state, action) => {
      state.buyerDetails = action.payload;
    },

    // Toggle whether billing info is the same as shipping
    toggleIsBillingSame: (state) => {
      state.buyerDetails.isBillingSame = !state.buyerDetails.isBillingSame;
      // If toggled, copy shipping details to billing details
      if (state.buyerDetails.isBillingSame) {
        state.buyerDetails.billingAddress = { ...state.buyerDetails.shippingAddress };
      } else {
        state.buyerDetails.billingAddress = {
          country: "",
          address1: "",
          address2: "",
          pincode: "",
          city: "",
          state: "",
        };
      }
    },

   
    updateOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },

    updateOrderItem: (state, action) => {
      const { index, itemData } = action.payload;
      state.orderDetails.items[index] = itemData;
    },

  
    updateStep: (state, action) => {
      state.step = action.payload;
    },

    updateShippingPartner: (state, action) => {
      state.shippingPartner = action.payload;
    },

   
    
  },
});

export const {
  updateBuyerDetails,
  toggleIsBillingSame,
  updateOrderDetails,
  updateOrderItem,
  updateStep,
  updateShippingPartner,
} = orderSlice.actions;

export default orderSlice.reducer;
