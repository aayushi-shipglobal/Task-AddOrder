import { z } from "zod";

export const consignorSchema = z.object({
  pickupAddress: z.string().min(1, "Please select an address"),
});

export const buyerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .regex(/^[A-Za-z]+$/, "Please enter alphabetic characters"),
  lastName: z
    .string()
    .min(1, "Last name is required.")
    .regex(/^[A-Za-z]+$/, "Please enter alphabetic characters"),
  mobileNo: z
    .string()
    .min(1, "Mobile number is required.")
    .regex(/^[0-9()+\- ]+$/, "Only numbers,brackets, hypen and + allowed."),
  email: z.string().min(1, "Please enter a valid email address").email("Please enter a valid email address"),
  country: z.string().min(1, "Please select a country"),
  state: z.string().min(1, "Please select a state"),
  address1: z.string().min(1, " Address 1 is required."),
  landmark: z.string().optional(),
  address2: z.string().min(9, "Address 2 is required."),
  pincode: z.string().min(1, "Pincode is required."),
  city: z.string().min(1, "City is required."),
  address3: z.string().min(1, " Address 1 is required."),
  address4: z.string().min(1, " Address 2 is required."),
  mark: z.string().optional(),
  pincode1: z.string().min(1, "Pincode is required."),
  city1: z.string().min(1, "City is required."),
  Country: z.string().min(1, "Please select a country"),
  state1: z.string().min(1, "Please select a state"),
});

 export const orderSchema = z.object({
  actualWeight: z
    .string()
    .min(1, "The package weight is required.")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid weight. Use a valid number."),
  length: z
    .string()
    .min(1, "The package length is required.")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid weight. Use a valid number."),
  breadth: z
    .string()
    .min(1, "The package breadth is required.")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid weight. Use a valid number."),
  height: z
    .string()
    .min(1, "The package height is required.")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid weight. Use a valid number."),
  invoiceNo: z.string().min(2, "The invoice number is required."),
  invoiceDate: z.date().refine((date) => date instanceof Date && !isNaN(date.getTime()), {
    message: "Please select  invoice date",
  }),
  invoiceCurrency: z.string().min(1, "Please select invoice currency"),
  orderId: z.string(),
  iossNumber: z.string().min(1, "Please enter invoice number"),
  items: z.array(
    z.object({
      productName: z.string().min(2, "Product Title is required."),
      sku: z.string().optional(),
      hsn: z.string().min(2, "HSN is required."),
      qty: z.string().min(1, "Product Qty is required."),
      unitPrice: z.string().min(1, "Product Price is required."),
      igst: z.string(),
    }),
  ),
});
