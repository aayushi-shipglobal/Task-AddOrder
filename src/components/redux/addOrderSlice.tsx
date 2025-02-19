import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buyerDetailsData: {
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    country: "",
    state: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    landmark: "",
    pincode: "",
    city: "",
    pincode1: "",
    city1: "",
    Country:"",
    state1: "",
    mark: "",
  },
  orderDetailsData: {
    actualWeight: "",
    length: "",
    breadth: "",
    height: "",
    invoiceNo: "",
    invoiceDate:new Date().toISOString(),
    invoiceCurrency: "INR",
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
  shippingPartner: { name: "", rate: "" },
  pickupAddress: "",
};

const addOrderSlice = createSlice({
  name: "addOrder",
  initialState,
  reducers: {
    updatePickupAddress: (state, action) => {
      state.pickupAddress = action.payload;
    },
    updateBuyerData: (state, action) => {
      state.buyerDetailsData = { ...state.buyerDetailsData, ...action.payload };
    },
    updateOrderData: (state, action) => {
      state.orderDetailsData = { ...state.orderDetailsData, ...action.payload };
    },
    updateStep: (state, action) => {
      state.step = action.payload;
    },
    updateShippingPartner: (state, action) => {
      state.shippingPartner = action.payload;
    },

    addItemToOrder: (state, action) => {
      state.orderDetailsData.items.push(action.payload);
    },
    removeItemFromOrder: (state, action) => {
      state.orderDetailsData.items = state.orderDetailsData.items.filter((_, index) => index !== action.payload);
    },
    updateItemInOrder: (state, action) => {
      const { index, itemData } = action.payload;
      state.orderDetailsData.items[index] = { ...state.orderDetailsData.items[index], ...itemData };
    },
  },
});

export const {
  updateBuyerData,
  updateOrderData,
  updateStep,
  updateShippingPartner,
  updatePickupAddress,
  addItemToOrder,
  removeItemFromOrder,
  updateItemInOrder,
} = addOrderSlice.actions;

export default addOrderSlice.reducer;
