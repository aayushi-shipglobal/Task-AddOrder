import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  productName: string;
  sku?: string;
  hsn: string;
  qty: string;
  unitPrice: string;
  igst: string;
}

interface OrderDetails {
  actualWeight: string;
  length: string;
  breadth: string;
  height: string;
  invoiceNo: string;
//   invoiceDate: string;
  invoiceCurrency: string;
  orderId: string;
  iossNumber: string;
  items: Item[];
}

interface OrderState {
  orderDetails: OrderDetails;
}

const initialState: OrderState = {
  orderDetails: {
    actualWeight: "",
    length: "",
    breadth: "",
    height: "",
    invoiceNo: "",
    // invoiceDate: "",
    invoiceCurrency: "",
    orderId: "",
    iossNumber: "",
    items: [],
  },
};

const orderSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    setOrderDetails: (state, action: PayloadAction<OrderDetails>) => {
      state.orderDetails = action.payload;
    },
    resetOrderDetails: (state) => {
      state.orderDetails = initialState.orderDetails;
    },
  },
});

export const { setOrderDetails, resetOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
