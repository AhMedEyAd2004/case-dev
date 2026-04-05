"use server";
import connectDB from "@/lib/mongodb";
import { Order } from "@/models/OrderDetails";

export const changeOrderStatus = async (orderId: string, formData: FormData) => {
  const orderStatus = formData.get("orderStatus") as string;

  await connectDB();
  await Order.findByIdAndUpdate(orderId, {
    $set: {
      status: orderStatus,
    },
  });
};
