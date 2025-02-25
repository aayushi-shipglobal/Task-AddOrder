import { z } from "zod";

export const consignorSchema = z.object({
  pickupAddress: z.string().min(1, "Please select an address"),
});

export const buyerSchema = (checked: boolean) => {
  return z.object({
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
    address2: z.string().min(2, "Address 2 is required."),
    pincode: z.string().min(1, "Pincode is required."),
    city: z.string().min(1, "City is required."),
    address3: checked ? z.string().optional() : z.string().min(1, "Address 1 is required."),
    address4: checked ? z.string().optional() : z.string().min(1, "Address 2 is required."),
    mark: z.string().optional(),
    pincode1: checked ? z.string().optional() : z.string().min(1, "Pincode is required."),
    city1: checked ? z.string().optional() : z.string().min(1, "City is required."),
    Country: checked ? z.string().optional() : z.string().min(1, "Please select a country"),
    state1: checked ? z.string().optional() : z.string().min(1, "Please select a state"),
  });
};
export const orderSchema = z.object({
  actualWeight: z.coerce
    .number()
    .min(0.01, "Weight must be at least 0.01 kg.")
    .max(300, "Weight must not be more than 300 kg.")
    .refine((val) => val > 0, {
      message: "Weight cannot be zero.",
    }),
  length: z.coerce.number().min(1, "Length must be at least 1 cm.").max(120, "Length must not be more than 120 cm."),

  breadth: z.coerce.number().min(1, "Breadth must be at least 1 cm.").max(120, "Breadth must not be more than 120 cm."),

  height: z.coerce.number().min(1, "Height must be at least 1 cm.").max(120, "Height must not be more than 120 cm."),
  invoiceNo:z
  .union([z.string(), z.date()])
  .refine((val) => val !== "" && val !== null, {
    message: "Please select invoice date",
  }),
  invoiceDate: z
  .union([z.string(), z.date()])
  .refine((val) => val !== "" && val !== null, {
    message: "Please select invoice date",
  }),
  invoiceCurrency: z.string().min(1, "Please select invoice currency"),
  orderId: z.string().optional(),
  iossNumber: z.string().optional(),
  items: z.array(
    z.object({
      productName: z
      .string()
      .min(1, "Product name is Required")
      .regex(
        /^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/,
        "The product name is invalid."),
      sku: z.string().optional(),
      hsn:  z.string().regex(/^\d{8}$/, "HSN must be 8 digits long."),
      qty: z.coerce
        .number()
        .min(1, "Quantity must not be Zero")
        .refine((val) => val > 0, {
          message: "Quantity must not be Zero",
        }),
      unitPrice: z.coerce
        .number()
        .min(1, "Unit Price must not be Zero")
        .refine((val) => val > 0, {
          message: "Unit Price must not be Zero",
        }),
      igst: z.string(),
    }),
  ),
});
