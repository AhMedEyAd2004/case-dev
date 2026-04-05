import mongoose from "mongoose";
import { z } from "zod";
import "./ImageConfig"; // ← always registers when Order is imported
import "./ShippingAddress"; // ← always registers when Order is imported
import "./BillingAddress"; // ← always registers when Order is imported
import "./betterAuth-UserDetails"; // ← always registers when Order is imported

/*In Next.js, module imports are not guaranteed to run in a specific order.
 When you had the imports in action.ts, Next.js could cache or skip them depending
  on how the module was bundled — so ShippingAddress, ImageConfig, and BillingAddress
   schemas weren't always registered by the time .populate() ran.
By moving the imports inside OrderDetails.ts, you created a hard dependency chain: */

// Rule of thumb: A Mongoose model should always be responsible
// for registering its own ref dependencies — not the files that consume it.

export const OrderValidator = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId).optional(),
  userId: z.string().min(1, "user Id is required"),
  configurationId: z.string().min(1, "Configuration is required"),
  shippingAddressId: z.string().optional(),
  billingAddressId: z.string().optional(),
  isPaid: z.boolean().default(false),
  amount: z.number().positive("Amount must be greater than 0"),
  status: z.enum(["awaiting_shipment", "shipped", "delivered"]).default("awaiting_shipment"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TOrder = z.infer<typeof OrderValidator>;

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "user", required: true }, // "user" = better-auth's collection name
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
