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
    checked:true,
  },
  orderDetailsData: {
    actualWeight: "",
    length: "",
    breadth: "",
    height: "",
    invoiceNo: "",
    invoiceDate:"",
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
    updateBuyerDetails: (state, action) => {
      state.buyerDetailsData = { ...state.buyerDetailsData, ...action.payload };
    },
    updateOrderDetails: (state, action) => {
      state.orderDetailsData = { ...state.orderDetailsData, ...action.payload };
    },
    updateStep: (state, action) => {
      state.step = action.payload;
    },
    updateShippingPartner: (state, action) => {
      state.shippingPartner = action.payload;
    },

    setItemToOrder: (state, action) => {
      state.orderDetailsData.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.orderDetailsData.items = state.orderDetailsData.items.filter((_, index) => index !== action.payload);
    },
    updateItem: (state, action) => {
      const { index, itemData } = action.payload;
      state.orderDetailsData.items[index] = { ...state.orderDetailsData.items[index], ...itemData };
    },
    updateChecked: (state, action) => {
      state.buyerDetailsData.checked = action.payload;
    }
  },
});

export const {
  updateBuyerDetails,
  updateOrderDetails,
  updateStep,
  updateShippingPartner,
  updatePickupAddress,
  setItemToOrder,
  removeItem,
  updateItem,
  updateChecked
} = addOrderSlice.actions;

export default addOrderSlice.reducer;
