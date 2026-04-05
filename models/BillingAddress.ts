import mongoose from "mongoose";
import { z } from "zod";

export const BillingAddressValidator = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId).optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

export type TBillingAddress = z.infer<typeof BillingAddressValidator>;
// Billing Address
const BillingAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

export const BillingAddress =
  (mongoose.models.BillingAddress as mongoose.Model<TBillingAddress>) ||
  mongoose.model<TBillingAddress>("BillingAddress", BillingAddressSchema);
