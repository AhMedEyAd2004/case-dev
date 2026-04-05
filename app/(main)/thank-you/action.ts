"use server";

import { auth } from "@/lib/auth/auth";
import connectDB from "@/lib/mongodb";
import { TBillingAddress } from "@/models/BillingAddress";
import { TImageConfig } from "@/models/ImageConfig";
import { Order } from "@/models/OrderDetails";
import { TShippingAddress } from "@/models/ShippingAddress";
import { headers } from "next/headers";

/*
Server Actions vs Server Components — Data Flow
Server Action → Client Component
Yes, there is a round trip:
Client → [network request] → Server Action → [network response] → Client

This means:
Extra network latency
Data fetching happens after the page loads
User sees a loading state 

=>// Server Component — NO round trip
Data is fetched ON the server before HTML is sent
*/

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (!data) throw new Error("You need to be logged in to view this page.");

  await connectDB();
  //so only the user with this order can view it
  //im getting the current logged in user from the getSession
  const orderDetails = await Order.findOne({
    _id: orderId,
    userId: data.user.id,
  })
    .populate<{
      shippingAddressId: TShippingAddress;
      configurationId: TImageConfig;
      billingAddressId: TBillingAddress;
    }>(["shippingAddressId", "configurationId", "billingAddressId"])
    .lean();

  if (!orderDetails) throw new Error("This order does not exist.");
  if (orderDetails?.isPaid) return JSON.parse(JSON.stringify(orderDetails));
  else return false;
};
