import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buyerDetails: {
    pickupAddress:"",
      firstName: "",
      lastName: "",
      mobileNo: "",
      mobile: "",
      alternateMobile: "",
      email: "",
      country: "",
      state: "",
      Country: "",
      address1: "",
      landmark: "",
      address2: "",
      pincode: "",
      city: "",
      first: "",
      last: "",
      address3: "",
      address4: "",
      mark: "",
      pincode1: "",
      city1: "",
      state1:"",
  },
    
  orderDetails: {
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
        qty: 0,
        unitPrice: 0,
        igst: "0",
      },
    ],
  },

  step: 1,
  shippingPartner: "Shipglobal WorldWide",
  
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateBuyerDetails: (state, action) => {
      state.buyerDetails = action.payload;
    },

    

   
    updateOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
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
