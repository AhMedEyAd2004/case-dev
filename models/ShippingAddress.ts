import mongoose from "mongoose";
import { z } from "zod";

export const ShippingAddressValidator = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId).optional(),
  name: z.string().min(1, "name is required"),
  address: z.string().min(1, "address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
});

export type TShippingAddress = z.infer<typeof ShippingAddressValidator>;

// Shipping Address
const ShippingAddressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String },
});

export const ShippingAddress =
  (mongoose.models.ShippingAddress as mongoose.Model<TShippingAddress>) ||
  mongoose.model<TShippingAddress>("ShippingAddress", ShippingAddressSchema);
