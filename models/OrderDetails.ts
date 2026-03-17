import mongoose from "mongoose";
import { z } from "zod";

export const OrderValidator = z.object({
  _id: z.string(),
  userId: z.string().min(1, "user Id is required"),
  configurationId: z.string().min(1, "Configuration is required"),
  shippingAddressId: z.string().optional(),
  billingAddressId: z.string().optional(),
  isPaid: z.boolean().default(false),
  amount: z.number().positive("Amount must be greater than 0"),
  status: z.enum(["awaiting_shipment", "shipped", "delivered"]).default("awaiting_shipment"),
});

export type TOrder = z.infer<typeof OrderValidator>;

// Order
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    configurationId: { type: mongoose.Schema.Types.ObjectId, ref: "ImageConfig", required: true },
    shippingAddressId: { type: mongoose.Schema.Types.ObjectId, ref: "ShippingAddress" },
    billingAddressId: { type: mongoose.Schema.Types.ObjectId, ref: "BillingAddress" },
    isPaid: { type: Boolean, default: false },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["awaiting_shipment", "shipped", "delivered"],
      default: "awaiting_shipment",
    },
  },
  { timestamps: true },
);

export const Order =
  (mongoose.models.Order as mongoose.Model<TOrder>) || mongoose.model<TOrder>("Order", OrderSchema);
