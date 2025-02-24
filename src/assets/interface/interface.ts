export interface BuyerData {
  firstName: string;
  lastName: string;
  mobileNo: string;
  email: string;
  country: string;
  state: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  landmark: string;
  pincode: string;
  city: string;
  pincode1: string;
  city1: string;
  Country: string;
  state1: string;
  mark: string;
  checked: boolean;
}

export interface OrderData {
  actualWeight: string;
  length: string;
  breadth: string;
  height: string;
  invoiceNo: string;
  invoiceDate: string;
  invoiceCurrency: string; 
  orderId: string;
  iossNumber: string;
  items: {
    productName: string;
    sku: string;
    hsn: string;
    qty: string;
    unitPrice: string;
    igst: string;
  }[];
  completeOrderForm: boolean;
}
